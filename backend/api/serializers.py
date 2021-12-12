# take model with python releated code
# translate to JSON

from rest_framework import serializers
from .models import MovieToPlaylist

class MovieToPlaylistSerializer(serializers.ModelSerializer): 
    class Meta:
        model = MovieToPlaylist
        fields = '__all__' #automatically an ID field

class SearchMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieToPlaylist
        fields = ['movie_title'] #only necessary fields
        
