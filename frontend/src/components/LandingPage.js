import { Link } from "react-router-dom";
import { Typography, Button, Container, Box } from '@mui/material';
import {useState, useEffect} from 'react';

function LandingPage({spotifyAuthenticated, authenticateSpotify}) {
    const [color1, setColor1] = useState('rgb(0,0,0)');
    const [color2, setColor2] = useState('rgb(0,0,0)');

    var colors = new Array(
        [62, 35, 255],
        [60, 255, 60],
        [255, 35, 98],
        [45, 175, 230],
        [255, 0, 255],
        [255, 128, 0]);

    var step = 0;
    //color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    var colorIndices = [0, 1, 2, 3];

    //transition speed
    var gradientSpeed = 0.002;

    function updateGradient() {
        var c0_0 = colors[colorIndices[0]];
        var c0_1 = colors[colorIndices[1]];
        var c1_0 = colors[colorIndices[2]];
        var c1_1 = colors[colorIndices[3]];

        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        setColor1("rgb(" + r1 + "," + g1 + "," + b1 + ")")
        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        setColor2("rgb(" + r2 + "," + g2 + "," + b2 + ")")

        //    $('#gradient').css({
        //      background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        //       background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

        step += gradientSpeed;
        if (step >= 1) {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];

            //pick two new target color indices
            //do not pick the same as the current one
            colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
          updateGradient();
        }, 100);
        return () => clearInterval(interval);
      }, []);

    return (
        
        <Box sx={{ 
            background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"
             }}>
            <Container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',

            }}>
                <Typography variant="h3" compact="h3" sx={{color: 'white', fontFamily:'Bebas Neue'}}>
                    Find a movie soundtrack! <br/> 🎥 🎶
                </Typography>
                {spotifyAuthenticated && <Button component={Link} to={'/search'} color="primary" variant="outlined" size='large' sx={{
                    m:5,
                    color:'white',
                    borderColor:'white'}}>
                    Begin
                </Button>}
                {!spotifyAuthenticated && <Button onClick={authenticateSpotify} color="primary" variant="contained" size='large' sx={{
                    m:5,
                    color:'white',
                    borderColor:'white',
                    background: '#1db954'}}>
                    Login with Spotify
                </Button>}
            </Container>
        </Box>
    );
}

export default LandingPage;


