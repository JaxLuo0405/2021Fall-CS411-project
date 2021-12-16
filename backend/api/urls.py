from django.urls import path
from .views import MovieToPlaylistView, SearchMovieView, Generate

urlpatterns = [
    path('movie', MovieToPlaylistView.as_view()),
    path('search-movie', SearchMovieView.as_view()),
    path('generate', Generate.as_view()),
    path('find-movie', Search.as_view()),
]
