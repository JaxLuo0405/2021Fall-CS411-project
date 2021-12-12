from django.db import models

# Create your models here.
class MovieToPlaylist(models.Model):
    Title = models.CharField(max_length=100)
    Year = models.CharField(max_length=100)
    Rated = models.CharField(max_length=100)
    Released = models.CharField(max_length=100)
    Runtime = models.CharField(max_length=100)
    Genre = models.CharField(max_length=100)
    Director = models.CharField(max_length=100)
    Writer = models.CharField(max_length=1000)
    Actors = models.CharField(max_length=1000)
    Plot = models.CharField(max_length=1000)
    Language = models.CharField(max_length=100)
    Country = models.CharField(max_length=100)
    Awards = models.CharField(max_length=100)
    Poster = models.CharField(max_length=1000)
    Metascore = models.CharField(max_length=100)
    imdbRating = models.CharField(max_length=100)
    imdbVotes = models.CharField(max_length=100)
    imdbID = models.CharField(max_length=100)
    Type = models.CharField(max_length=100)
    DVD = models.CharField(max_length=100)
    BoxOffice = models.CharField(max_length=100)
    Production = models.CharField(max_length=100)
    Website = models.CharField(max_length=100)
