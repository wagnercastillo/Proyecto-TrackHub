if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
const app = require('./app');

app.listen(app.get('port'),()=>{
    console.log('Servidor escuchando en el puerto ',app.get('port'));
    console.log('Envioment: ', process.env.NODE_ENV);
});
