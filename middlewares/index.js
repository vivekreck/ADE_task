const fromIslogged = require('./is-logged');

const appMiddlewares = {
    isLogged: fromIslogged.isLogged,
}

module.exports = appMiddlewares;