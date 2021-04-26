import {useState} from 'react';
import Axios from 'axios';
// import { navigate } from '@reach/router';
import YoutubeEmbed from '../components/YoutubeEmbed';
import MediaCard from '../components/MediaCard';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Trailer from '../assets/img/trailer.jpg';
import Typography from '@material-ui/core/Typography';

const Main = props => {

    // MOVIE CODE ********************************************
    const [movies,setMovies] = useState();
    const [youTube, setYouTube] = useState(0);

    const handleRandomMovie = () => {
        Axios
            .get("http://localhost:8000/api/movies/random")
            .then(res => {
                setMovies(res.data.movie);
                setYouTube(res.data.trailer);
            })
            .catch(err =>console.log(err));
    };

    const addFavorite = () => {
        Axios
            .put("http://localhost:8000/api/movies/update")
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            marginTop: 20,

        },
        card: {
            height: "100%",
            width: 266.66,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",   
        },
        gridVertical: {
                margin: 0,
                position: "absolute",
                top: "50%",
                msTransform: "translateY(-50%)",
                transform: "translateY(-50%)",
                alignItems: "center",
                justify: "center"
        },
        button: {
            marginLeft: "5px",
        },
        bottomButtonGroup: {
            fontWeight: "700", 
            backgroundColor: "white", 
            padding: "15px", 
            borderRadius: "5px", 
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" 
        }

    }));

    const classes = useStyles();

    return (
        
        <div>
            <div
                className= "mainDiv"
                style={ movies ?
                        {
            
                            backgroundImage: `url(http://image.tmdb.org/t/p/original/${movies.backdrop_path})`,
                            backgroundSize: "cover",
                            backgroundColor: "rgba(255,255,255,0.6)",
                            backgroundBlendMode: "lighten",
                            height: "93.2vh",
                        }
                        :
                        {}
                }
            >
                {
                    movies ?
            
                    <div>
                        <div >
                            <Grid container direction="row" xs={12} alignItems="stretch" align = "center" justify = "center" >
                                <Box component="div" display="inline" m={2} mt={4}>
                                            <Card className={classes.card} >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleRandomMovie()}>
                                                    Random
                                                </Button>
                                            </Card>
                                </Box>
                                <Box component="div" display="inline" m={2} mt={4}>
                                    <MediaCard
                                        movieTitle={movies.original_title}
                                        releaseDate={movies.release_date}
                                        rating={movies.vote_average}
                                        overview={movies.overview}
                                    />
                                </Box>
                            </Grid>
                            <Grid container direction="row" xs={12} alignItems="stretch" align = "center" justify = "center">
                                <Box component="div" display="inline" m={2}>
                                        <img src={`https://image.tmdb.org/t/p/w342${movies.poster_path}`} alt="poster" style={{height: 400}} />
                                </Box>
                                <Box component="div" display="inline" m={2}>
                                    {
                                            youTube === undefined ?
                                            <img src={Trailer} alt="no trailer" style={{width: 700}} /> :
                                                <YoutubeEmbed embedId={youTube.key} />
                                    }
                                </Box>
                            </Grid>
                            <Grid  container direction="row" xs={12} alignItems="stretch" align ="center" justify = "center">
                                <Box className={classes.bottomButtonGroup} component="div" display="inline" m={2} >
                                    Add to:
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="Primary"
                                        // onClick={() => addFavorites(movies.id)}  --TBD
                                    >
                                        Favorites
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant="contained"
                                        color="secondary"
                                        // onClick={() => addWatchlist(movies.id)} --TBD
                                    >
                                        Watchlist
                                    </Button>

                                </Box>
                            </Grid>
                        </div>
                    </div> :
                        <Grid container className={classes.gridVertical} direction="column">
                            <h4>Press the Random button to show a random movie</h4>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleRandomMovie()}>
                                Random
                            </Button>
                        </Grid>
            
                }
            </div>
        </div>
    )
}
export default Main;