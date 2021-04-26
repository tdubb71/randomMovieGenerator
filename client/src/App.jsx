import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, } from 'react';
import {Router, Redirect } from '@reach/router';
// import LogReg from './views/LogReg';
import Main from './views/Main';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import AppBar from './components/AppBar';


const App = () => {

    const [loggedIn, setLoggedIn] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const handleUserLogin = () => {
        setLoggedIn(JSON.parse(localStorage.getItem("user")))
    }

    const handleLogout = e => {
        setLoggedIn(null)
    };

    return (
        <div className="App">
        <AppBar loggedIn ={loggedIn} handleLogout ={handleLogout} />
        <Router>
            {/* <LogReg path="/" handleUserLogin ={handleUserLogin}/> */}
            <Redirect from='/' to='/login' noThrow />
            {/* noThrow prevents redirect error: https://reach.tech/router/api/Redirect  */}
            <SignIn path="/login" handleUserLogin ={handleUserLogin} />
            <SignUp path="/register" handleUserLogin ={handleUserLogin} />
            <Main path="/dashboard" />
        </Router>
        </div>
    );
}

export default App;
