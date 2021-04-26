const LogRegController = require('../controllers/auth.controller'),
    UserController = require('../controllers/user.controller'),
    MovieController = require('../controllers/movie.controller'),
    {authenticate} = require('../config/jwt.config.js');

module.exports = (app) => {
    app.post('/api/register', LogRegController.register)
    app.post('/api/login', LogRegController.login)
    app.get('/api/users', authenticate, UserController.index)
    app.get('/api/logout', authenticate, LogRegController.logout)
    app.get('/api/movies/random', MovieController.randomMovie);
}