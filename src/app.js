const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const bcrypt = require('bcryptjs');
<<<<<<< HEAD
const flash =require('connect-flash');

=======
>>>>>>> e4620a0254d9941856b75974ddb4355d910fe5de
import {createRoles} from './libs/inicioSetup'

//Inicializations
const app= express();
createRoles();
require('./database');


//Settings
app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))
app.use(flash());
//
//
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename: (req, file, cb)=>{
        cb(null, new Date().getTime()+path.extname(file.originalname));
    }
})

app.use(multer({storage}).single('image'));
//Routes
app.use(require('./routes/frecuencia.routes'));
app.use(require('./routes/cooperativa.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/unidades.routes'));
<<<<<<< HEAD
app.use(require('./routes/user.routes'));
=======
app.use(require('./routes/ruta.routes'));

app.use(require('./routes/boleto.routes'));
app.use(require('./routes/opciones.routes'));

>>>>>>> e4620a0254d9941856b75974ddb4355d910fe5de

app.use(require('./routes/turno.routes'));

module.exports=app;

//Static files
app.use(express.static(path.join(__dirname, 'public')));