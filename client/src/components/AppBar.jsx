// import { useState } from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TheatersIcon from '@material-ui/icons/Theaters';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";

const ButtonAppBar = props => {

    //LOGIN LOGOUT CODE****************************************

    const {loggedIn, handleLogout} = props;

    const logout = () => {
        Axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => {
                localStorage.clear()
                navigate('/login')
            })
            .then(() => handleLogout())
            .catch(err => console.log(err));
    };

    // OTHER FORMATTING

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        welcome: {
            marginRight: theme.spacing(6),
            color: "#ffeb3b",
        },
        })
    );

    const handleButtonClick = pageURL => {
        navigate(pageURL);
      };

    const classes = useStyles();


    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                { loggedIn !== null ?
                    <>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <TheatersIcon />
                    </IconButton>
                    <Typography color="inherit" variant="h6"  className={classes.title}>
                        <Button
                            color="inherit"
                            style={{ fontSize: '20px' }}
                            onClick={() => handleButtonClick("/dashboard")}>
                            Random Movie Generator
                        </Button>
                    </Typography>
                        <Typography className={classes.welcome}>
                        Welcome, {loggedIn.firstName}!
                        </Typography>
                        <Button color="inherit"  onClick={logout}>Logout</Button>
                    </> :
                    <>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <TheatersIcon />
                    </IconButton>
                    <Typography color="inherit" variant="h6" className={classes.title}>
                        <Button
                            color="inherit"
                            style={{ fontSize: '20px' }}
                            onClick={() => handleButtonClick("/login")}>
                            Random Movie Generator
                        </Button>
                    </Typography>
                        <Button
                            color="inherit" 
                            onClick={() => handleButtonClick("/login")}>
                            Login
                        </Button>
                    </> 
                }
            </Toolbar>
        </AppBar>
        </div>

    );
}

export default ButtonAppBar;
