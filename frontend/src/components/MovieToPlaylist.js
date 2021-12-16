import React, { Component } from 'react';

export default class MovieToPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Plot: "",
            Genre: "",
        };
        
        this.getDetails();
    }
    // gets movie details
    getDetails() {
        fetch('api/find-movie')
        .then((response) => {
            if (!response.ok) {
                return {}
            }
            else {
                return response.json();
            }
        })
        .then((data) => {
            this.setState ({
                Title: data.Title,
                Plot: data.Plot,
                Genre: data.Genre,
                Poster: data.Poster
            });
            console.log(data);
        });
    }


    render() {
        return (
            <Grid container spacing={1}>
            <Grid item xs={12} align ="center"> 
                <Typography component = "h4" variant = "h4">
                    Name: {this.state.Title}
                </Typography>
            </Grid> 
            <Grid item xs={12} align ="center"> 
                <Button color = "secondary" variant = "contained" to = "/search" component = {Link}> 
                     Search another movie!
                </Button>
            </Grid>
        </Grid>
        )
    }
}


