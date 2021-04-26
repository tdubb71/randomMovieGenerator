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
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="">
            Random Movie Generator
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

const SignIn = props => {

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
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        }));

    const classes = useStyles();
    

    // LOGIN SECTION

    const {handleUserLogin} = props;

    const initialLog = {
        email: "",
        password: ""
    }

    const [log,setLog] = useState(initialLog);
    const [logErrors,setLogErrors] = useState(initialLog);

    const handleLogInputs = e => {
        setLog({
            ...log,
            [e.target.name] : e.target.value
        })
    }

    const handleLogin = e => {
        e.preventDefault();
        Axios.post('http://localhost:8000/api/login',log,{withCredentials:true})
            .then(res => {
                console.log(res.data)
                if(res.data.msg){
                    localStorage.setItem("user",JSON.stringify(res.data.userLogged))
                    handleUserLogin()
                    navigate('/dashboard');
                }
                else{
                    setLogErrors({
                        email: {
                                message: res.data.error
                        },
                        password: {
                                message: res.data.error
                        }
                    });
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
            Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleLogin}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleLogInputs}
                    value={log.email}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleLogInputs}
                    value={log.password}
                />
                <span className="text-danger">{logErrors.password ? logErrors.password.message : ""}</span>
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Grid container justify="flex-end">
                    {/* <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid> */}
                    <Grid item>
                    <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
    );
}

export default SignIn;