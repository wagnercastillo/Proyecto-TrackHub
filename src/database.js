import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(db => console.log('BD CONECTADA'))
.catch(error => console.log('BD NO CONECTADA', error))