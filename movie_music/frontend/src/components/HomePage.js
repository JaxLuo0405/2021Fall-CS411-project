import React, { Component } from "react";
import SearchMoviePage from './SearchMoviePage';
import MovieToPlaylist from './MovieToPlaylist';
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotifyAuthenticated: false,
        };
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.handleLoginButtonPressed = this.handleLoginButtonPressed.bind(this);
    }

    handleLoginButtonPressed() {
        this.authenticateSpotify()
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

    render() {
        const isAuthenticated = this.state.spotifyAuthenticated
        return (
        <Router>
            <Switch>
                <Route exact path = "/">
                <Grid container spacing={3}>
             <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    Find a movie soundtrack
                </Typography>
             </Grid>
             {isAuthenticated 
             ? 
             <Grid item xs={12} align="center">
             <Button 
                     color = "primary" 
                     variant = "contained" 
                     to = "/search"
                     component = {Link}>
                     Begin
             </Button>
         </Grid> 
         : 
         <Grid item xs={12} align="center">
                <Button 
                        color = "primary" 
                        variant = "contained" 
                        onClick = {this.handleLoginButtonPressed}>
                        Login with Spotify 
                </Button>
            </Grid>}   
        </Grid>
            </Route>
                <Route path = "/search" component = {SearchMoviePage} />
                <Route path= "/generate" component = {MovieToPlaylist} />
            </Switch>
        </Router>
        );
    }
}
