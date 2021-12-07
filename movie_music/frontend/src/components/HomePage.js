import React, { Component } from "react";
import SearchMoviePage from './SearchMoviePage';
import MovieToPlaylist from './MovieToPlaylist';
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";


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
    }

    renderHomePage() {
        return (
            <Grid container spacing={3}>
             <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    Find a movie soundtrack
                </Typography>
             </Grid>
        <Grid item xs={12} align="center">
            <Button color="primary" to="/spotify" component={Link}>
              Login with Spotify
            </Button>
        </Grid>
      </Grid>
        );
    }

    render() {
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
        <Grid item xs={12} align="center">
            <Button color="primary" to="/search" component={Link}>
              Begin
            </Button>
        </Grid>
      </Grid>
                
                </Route>
                <Route path = "/search" component = {SearchMoviePage} />
                <Route path= "/generate" component = {MovieToPlaylist} />
            </Switch>
        </Router>
        );
    }
}