import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default class SearchMoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_title: "",
            spotifyAuthenticated: false,
        };
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.handleSearchButtonPressed = this.handleSearchButtonPressed.bind(this);
        this.handleMovieTitleChange = this.handleMovieTitleChange.bind(this);
    }

    handleMovieTitleChange(e){
        this.setState({
            movie_title: e.target.value,
        });
    }

    handleSearchButtonPressed(){
        this.authenticateSpotify()
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        if (is_authenticated) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    movie_title: this.state.movieTitle
                }),
            };
            fetch('/api/search-movie', requestOptions)
                .then((response) => response.json())
                .then((data) => this.props.history.push('generate'));
        }
        else {
        this.authenticateSpotify()
        }
    }

    authenticateSpotify() {
        fetch('/spotify/is-authenticated')
        .then((response) => response.json())
        .then((data) => {
            this.setState({spotifyAuthenticated: data.status})
            if (!data.status) {
                fetch('/spotify/get-auth-url').then((response) => response.json())
                .then((data) => {
                    window.location.replace(data.url);
                });
            }
        });
    }

    render () {
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align ="center"> 
                <Typography component = "h4" variant = "h4">
                    Search a movie
                </Typography>
            </Grid> 
            <Grid item xs={12} align ="center"> 
                <FormControl>
                    <TextField 
                    required = {true}
                     type = "string" 
                    onChange={this.handleMovieTitleChange}/>
                        <FormHelperText>
                            <div align = "center">
                                Movie Title
                            </div>
                        </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align ="center"> 
                <Button 
                    color = "primary" 
                    variant = "contained" 
                    onClick = {this.handleSearchButtonPressed}> 
                    Search 
                </Button>
            </Grid>
            <Grid item xs={12} align ="center"> 
                <Button color = "secondary" variant = "contained" to = "/" component = {Link}> 
                     Back 
                </Button>
            </Grid>
        </Grid>
        );
    }
}