User Story 1: Login

User decides they want to make a playlist for a rainy day in city x. They visit our application website, and click to create a 
new account. The login dialogue prompts the user to sign in with their spotify account. If their spotify account is invalid, or 
they do not have one, a dialogue appears which offers the user the option to either try to log in again, or direct them to the 
option to make a free Spotify account (the non-premium Spotify accounts using facebook accounts, if they do not have a facebook 
account they can simply sign up with an email address). If the spotify account used to log in is valid, then the user answers a 
series of profile questions, including their home location, and some top genres that they listen to.

REVISION: Login

User decides they want to find details of a specific movie. They visit our application website, and click on Login with Spotify. 
The login will redirect them to the Spotify login page and login with their Spotify account. If their spotify is invalid, or do they not have
one, they must create one before using our web app. Once they login they will be redirected to the homepage and be able to begin.
Users are authenticated for an hour. After an hour expires when a user wants to visit our website they must be authenticated by Spotify again.
Had to change and simplify plan.

User Story 2: Create a playlist

This user story assumes that the user is logged in and has set up their profile (User Story 1). Upon logging in the user is 
prompted with the question of how long they want the playlist to be. The user can put in either amount of songs, or length in time. 
The generated playlist should not exceed the amount of songs or length entered. If the user enters an invalid number of songs or 
length in time (such as a negative amount) the app will prompt the user to enter a valid amount. The user can then select a button 
corresponding to if they want to use their current location or another city. If they select another city a box will appear and the 
user will be prompted to input a city (if the city is invalid, user will be prompted to input a valid city). After the user types 
in the attributes they want for the playlist, the app will first search previous generated playlists to detect if there are any 
playlist with similar attributes already in the database. If there are, the user is offered these similar playlists in a “you may 
also like these” window. The generated playlist will be displayed with the name “x days in y” where x is the current weather such as 
‘sunny’ or ‘rainy,’ and y is the city such as ‘Boston.’ The created playlist is automatically added to the user’s spotify playlist. 

REVISION: Search a movie

The user will search a movie and press 'Search' which will redirect them to our generate page which displays the information of the movie 
they requested. Users can go back to the Search page by pressing 'Search another movie' button. Had to change and simplify plan.


User Story 3: Users interact with playlist

This user story assumes that the user is logged in, has set up their profile (User Story 1), and has created a playlist (User Story 2). 
The playlist, composed of a list of songs, contains the song attributes (artist, album, and length) next to each song title. To the right 
of  the song’s attributes there are thumbs up and down buttons. The user can press on these buttons depending on if the song is a good or 
bad representation of the current weather. This helps the system learn and provide a more accurate playlist in the future. The user can 
also choose to remove any songs on the playlist with a ‘X’ button located to the right of the thumbs up and down buttons. When a song is 
removed a new song is added to the playlist that meets the weather and length (if any) requirement. Users can also choose to view the 
similar playlists that are displayed in a window (refer to User Story 2) and add those to their library. 

User Story 4: Users interacting with other users

This user story assumes that the user is logged in and has set up their profile (User Story 1). On our application website users can view a 
library of archived playlists that the system has previously created (if any). Since the web app is connected to spotify you can access your 
friends libraries of their archived playlists by going on their profile. Users can also access public profiles, such as musicians on tour, and 
view their libraries of archived playlists. To keep track of your favorite artists generated playlists you can follow them on our web application 
and choose to get notifications via email when they create a new playlist. 
