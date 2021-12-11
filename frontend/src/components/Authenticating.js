import { useState, useEffect } from 'react'
import { Link, useSearchParams } from "react-router-dom";


function Authenticating({ spotifyAuthenticated, setSpotifyAuthenticated, isSpotifyAuthenticated }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [response, setResponse] = useState(null);
    function getAuthCode() {
        alert(searchParams.get('code'));
        return fetch(`http://localhost:8000/spotify/redirect?code=${searchParams.get('code')}`)
            .then((response) => response.json()).then((data) => setResponse(data));
    }
    useEffect(() => {
        if (spotifyAuthenticated) {
            alert('authenticated')
        } else {
            getAuthCode().then(() => {
                alert('hello world')
                return isSpotifyAuthenticated()
                    .then((data) => {
                        alert(JSON.stringify(data))
                        setSpotifyAuthenticated(data.status);
                    })
            })
            // setSpotifyAuthenticated()
        }
    }, [searchParams]);

    return (
        <div>authenticating... {JSON.stringify(response)}</div>
    );

}


export default Authenticating;