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
    def post(self, APIView):
        movies = MovieToPlaylist.objects.all()
        serializer_class = MovieToPlaylistSerializer
        return Response(serializer_class.data)

class SearchMovieView(APIView):
    serializer_class = SearchMovieSerializer

    def post(self, request, formant= None):
        # if current user doesn't have current session create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data= request.data)
        if serializer.is_valid():
            Title = request.GET.get("title")
            return Response(SearchMovieSerializer(Title).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class Search(APIView): 

    def get(self, request):
        if request.data.get("order"):
            if request.data["order"] == "dsc":
                print("working dsc")
                movies = MovieToPlaylist.objects.all().order_by("id").reverse()
            else:
                return Response(data={"Error": "You can only sort id with order equal to dsc (for descending)"}, status=status.HTTP_400_BAD_REQUEST)

        else:
            movies = MovieToPlaylist.objects.all()
        serializer = SearchMovieSerializer(movies, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if request.data.get("Title"):
            title = request.data["Title"]
        else:
            return Response(data={"Error": "You must provide title in POST request with key named title"}, status=status.HTTP_400_BAD_REQUEST)
        my_api_key = OMDB_KEY
        url = f'http://www.omdbapi.com/?t={title}&type=movie&apikey={my_api_key}'
        response = request.get(url)
        if response.status_code == request.codes.ok and response.json()['Response'] == 'True':
            if not MovieToPlaylist.objects.filter(Title=response.json()['Title']).exists():
                serializer = MovieToPlaylistSerializer(data=response.json())
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                else:
                    return Response(data={"Error": "Problem with serializing data from external API"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                movie_from_database = MovieToPlaylist.objects.get(Title=response.json()['Title'])
                movie_from_database_serialized = MovieToPlaylistSerializer(movie_from_database)
                return Response(movie_from_database_serialized.data)
        else:
            return Response(data={"Error": "No movie with that title"}, status=status.HTTP_204_NO_CONTENT)
