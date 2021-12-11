import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchMoviePage from './components/SearchMoviePage';
import MovieToPlaylist from './components/MovieToPlaylist';
import LandingPage from './components/LandingPage';
import Authenticating from './components/Authenticating';
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom";


function App() {
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
    const [movieTitle, setMovieTitle] = useState("");
    // const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(() => {
    //     alert(searchParams.get('code'))
    //   }, [searchParams]); 


    async function isSpotifyAuthenticated() {
        return fetch('http://localhost:8000/spotify/is-authenticated')
        .then((response) => response.json());
    }

    async function authenticateSpotify() {
        alert('spotify authenticatinggg');
        return isSpotifyAuthenticated()
        .then((data) => {
            setSpotifyAuthenticated(data.status);
            if (!data.status) {
                fetch('http://localhost:8000/spotify/get-auth-url')
                .then((response) => response.json())
                .then((data)=> {
                    window.location.replace(data.url);
                });                
            }
        })
    }

    return (
        <BrowserRouter>
            <Routes>
                # setting landing page spotifyAuthenticated into the apps spotifyAuthenticated variable
                <Route path="/" element={<LandingPage spotifyAuthenticated={spotifyAuthenticated} authenticateSpotify={authenticateSpotify}/>} />
                <Route path="authenticating" element={<Authenticating spotifyAuthenticated={spotifyAuthenticated} setSpotifyAuthenticated={setSpotifyAuthenticated} isSpotifyAuthenticated = {isSpotifyAuthenticated}/>} />
                <Route path="search" element={<SearchMoviePage />} />
                <Route path="generate" element={<MovieToPlaylist />} />
            </Routes>
        </BrowserRouter>
    );

}


export default App;