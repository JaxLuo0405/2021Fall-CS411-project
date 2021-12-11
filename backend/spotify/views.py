from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import execute_spotify_api_request, get_user_tokens, update_or_create_user_token, is_spotify_authenticated
from api.models import MovieToPlaylist


class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'playlist-modify-private playlist-read-private playlist-modify-public'
        
        # frontend gets this url and sends it back, returns url to authenticate
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status = status.HTTP_200_OK)

def spotify_callback(request, format= None):
    code = request.GET.get('code') # used to authenicate user
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data= {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')
    
    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_token(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:')

class IsAuthenticated(APIView):
    def get(self, request, format= None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status = status.HTTP_200_OK)

class FindPlaylist(APIView):
    def get(self, request, format= None):
        movieTitle = self.request.session.get('movie_title')
        movieTitle = "Enchanted"
        movieToPlaylist = MovieToPlaylist.objects.filter(movie_title=movieTitle)
        if movieToPlaylist.exists():
            movieToPlaylist = movieToPlaylist[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = movieToPlaylist.host
        endpoint = "vi/search"
        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')

        artist_string = ""

        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string += ", "
            name = artist.get('name')
            artist_string += name

        song = {
            'title': item.get('name'),
            'artist': artist_string,
            'duration': duration,
            'time': progress,
            'image_url': album_cover,
            'is_playing': is_playing,
            'votes': 0,
            'id': song_id
        }

        return Response(song, status=status.HTTP_200_OK)




