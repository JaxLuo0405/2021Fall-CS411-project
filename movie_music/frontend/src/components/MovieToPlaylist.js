import React, { Component } from 'react';

export default class MovieToPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_title: "",
            description: "",
            genre: "",
        };
        
        this.getDetails();
    }
    // gets details
    getDetails() {
        fetch('/api/generate').then((response) => 
            response.json()
        ).then((data) => {
            this.setState ({
                movie_title: data.movie_title,
                description: data.description,
                genre: data.genre,
            });
        });
        
    }


    render() {
        return (
        <div>
            <p> Name: {this.state.movieTitle} </p>
            <p> Description: </p>
        </div>
        );
    }
}


