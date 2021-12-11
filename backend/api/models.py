from django.db import models

# Create your models here.
class MovieToPlaylist(models.Model):
    movie_title = models.CharField(max_length = 50)
    decription = models.TextField
    movie_genre = models.CharField(max_length = 20)
    host = models.CharField(max_length = 50, unique = True)
    created_at = models.DateTimeField(auto_now_add = True)

