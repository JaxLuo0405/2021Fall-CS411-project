# take model with python releated code
# translate to JSON

from rest_framework import serializers
from .models import MovieToPlaylist

class MovieToPlaylistSerializer(serializers.ModelSerializer): 
    class Meta:
        model = MovieToPlaylist
        fields = ['id', 'description', 'movie_title', 'movie_genre', 
                    'host', 'created_at'] #automatically an ID field

class SearchMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieToPlaylist
        fields = ['movie_title'] #only necessary fields
        