from django.shortcuts import render
from rest_framework import generics, status
from .serializers import MovieToPlaylistSerializer, SearchMovieSerializer
from .models import MovieToPlaylist
from rest_framework.views import APIView
from rest_framework.response import Response
from .creds import OMDB_KEY, OMDB_URL
import requests


# session connection between two computers
# Create your views here.
class MovieToPlaylistView(generics.ListAPIView):
    queryset = MovieToPlaylist.objects.all()
    serializer_class = MovieToPlaylistSerializer

class Generate(APIView):
    # get method call from API?
    serializer_class = MovieToPlaylistSerializer

    def get(self,APIView):
        title = SearchMovieView.movie
        req = f'{OMDB_URL}&apikey={OMDB_KEY}'
        # response = 
    # def get(self, APIView):
    #     movies = MovieToPlaylist.objects.all()
    def post(self, request):
        movie_title = SearchMovieView.Title
        url = f'{OMDB_URL}?t={movie_title}&type=movie&apikey={OMDB_KEY}'
        response = requests.get(url)
        data = response.json()
        return data['Title'], data['Plot']

class SearchMovieView(APIView):
    serializer_class = SearchMovieSerializer

    def post(self, request, format=None):
        print("hola")
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data= request.data) 
        if serializer.is_valid():
            movie_title = serializer.data.get('data.Title')
            host = self.request.session.session_key
            queryset = MovieToPlaylist.objects.filter(host = host)
            if queryset.exists():
                movieToPlaylist = queryset[0]
                movieToPlaylist.Title = Title
                movieToPlaylist.save(update_fields=['Title'])
                return Response(MovieToPlaylistSerializer(movieToPlaylist).data, status=status.HTTP_200_OK)
            else:
                movieToPlaylist = MovieToPlaylist(Title = Title),
                movieToPlaylist.save()
                return Response(MovieToPlaylistSerializer(movieToPlaylist).data, status=status.HTTP_201_CREATED)
            return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)           
