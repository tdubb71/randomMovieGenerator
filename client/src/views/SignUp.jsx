import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useState} from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';

function Copyright() {
    return (
        <div>
            <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Random Movie Generator
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
        </div>
    );
}


const SignUp = props => {

    const {handleUserLogin} = props;

    // STYLES SECTION

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        }));
        
    const classes = useStyles();


    // REGISTRATION SECTION

    const initialReg = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const [reg,setReg] = useState(initialReg);
    const [regErrors,setRegErrors] = useState(initialReg);

    
    const handleRegInputs = e => {
        setReg({
            ...reg,
            [e.target.name] : e.target.value
        })
    }

    const handleRegister = e => {
        e.preventDefault();
        Axios.post('http://localhost:8000/api/register',reg,{withCredentials:true})
            .then(res => {
                if(res.data.msg){
                    localStorage.setItem("user",JSON.stringify(res.data.userLogged))
                    handleUserLogin()
                    navigate('/dashboard');
                }
                else{
                    setRegErrors(res.data);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleRegister} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <div>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            onChange={handleRegInputs}
                            value={reg.firstName}
                        />
                        <span className="text-danger">{regErrors.firstName ? regErrors.firstName.message : ""}</span>
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange={handleRegInputs}
                        value={reg.lastName}
                    />
                    <span className="text-danger">{regErrors.lastName ? regErrors.lastName.message : ""}</span>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleRegInputs}
                        value={reg.email}
                    />
                    <span className="text-danger">{regErrors.email ? regErrors.email.message : ""}</span>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleRegInputs}
                        value={reg.password}
                    />
                    <span className="text-danger">{regErrors.password ? regErrors.password.message : ""}</span>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        onChange={handleRegInputs}
                        value={reg.confirmPassword}
                    />
                    <span className="text-danger">{regErrors.confirmPassword ? regErrors.confirmPassword.message : ""}</span>
                    </Grid>
                    {/* <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                    </Grid> */}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/login" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
        </Container>
    );
}

export default SignUp;