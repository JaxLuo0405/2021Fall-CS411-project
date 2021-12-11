import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useSearchParams } from "react-router-dom";

export default function SearchMoviePage({ }) {
    const [movieTitle, setMovieTitle] = useState("");
    // const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(() => {
    //     alert(searchParams.get('code'))
    //   }, [searchParams]); // Only re-run the effect if count changes

    function handleMovieTitleChange(event) {
        setMovieTitle(event.target.value);
    }

    async function isSpotifyAuthenticated() {
        // return fetch('http://localhost:8000/spotify/is-authenticated')
        // .then((response) => response.json());
    }

    async function authenticateSpotify() {
        // return isSpotifyAuthenticated()
        // .then((data) => {
        //     setSpotifyAuthenticated(data.status);
        //     if (!data.status) {
        //         fetch('http://localhost:8000/spotify/get-auth-url')
        //         .then((response) => response.json())
        //         .then((data)=> {
        //             window.location.replace(data.url);
        //             authenticateSpotify();
        //         });                
        //     }
        // })
    }


    async function handleSearchButtonPressed(event) {
        // is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        alert('authenticated else')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                movie_title: this.state.movieTitle
            }),
        };
        fetch('/api/search-movie', requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.history.push('generate'));

    }

    // async function handleSpotifyAuthenticated(event) {
    //     if (!spotifyAuthenticated) {
    //         return authenticateSpotify.then(() => alert('handleSpotifyAuthenticated first if'));
    //     } else {
    //         const requestOptions = {
    //             method: 'GET',
    //             headers: 
    //         }
    //     }
    // }


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">

                <Typography component="h4" variant="h4">
                    Search a movie
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required={true}
                        type="string"
                        value={movieTitle}
                        onChange={handleMovieTitleChange}
                    />
                    <FormHelperText>
                        <div align="center">
                            Movie Title
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={async (e) => await handleSearchButtonPressed(e)}>
                    Search
                </Button>
                <p>{movieTitle}</p>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}


