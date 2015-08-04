var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//IMPORTAMOS VIEW ENGINE EJS
var ejs = require('ejs');
//IMPORTAMOS EXPRESS-PARTIALS PARA LAS VISTAS PARCIALES
var partials = require('express-partials');
var methodOverride = require('method-override');
// Middleware para controlar la sesion
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//DESACTIVAMOS VIEW ENGINE JADE
//app.set('view engine', 'jade');
//USAMOS VIEW ENGINE EJS
app.set('view engine', 'ejs');

// SOPORTE FAVICON
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));
//semilla para codificar las sesiones (puede no tener semilla)
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
//SOPORTE VISTAS PARCIALES
app.use(partials());

//helpers dinamicos:
app.use(function(req,res, next){
	
	//guardar path en session.redir para despues de login
	if(!req.path.match(/\/login|\/logout/)){
		req.session.redir = req.path;
	}
	
	//Hacer visible req.session en las vistas
	res.locals.session =req.session;
	next();
	
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
