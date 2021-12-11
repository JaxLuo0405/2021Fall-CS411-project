import './App.css';
import { Link } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";


function App() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    Find a movie soundtrack!
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Link to="/spotify">
                    <Button color="primary">
                        Begin
                    </Button>
                </Link>
            </Grid>
        </Grid>
    );
}



export default App;
