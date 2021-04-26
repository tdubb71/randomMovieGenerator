import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { deepOrange, } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
        root: {
            width: 700,
            textAlign: "left",
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        }
    })
);

const MediaCard = ({ movieTitle, releaseDate, rating, overview }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Grid container direction="row" justify="space-between">
                        <Grid item>
                            <Typography variant="h5" component="h2">
                                {movieTitle}
                            </Typography>
                            <Typography gutterBottom  color="textSecondary">
                                {releaseDate}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar className={classes.orange} display="inline">{rating}</Avatar>
                        </Grid>
                    </Grid>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                        {overview}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default MediaCard;