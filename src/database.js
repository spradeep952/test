let mongoose = require('mongoose')

const databaseName = 'test';
const username = 'spradeep952'
const password = 'spradeep952'
const server = `mongodb+srv://${username}:${password}@cluster0.oamttj3.mongodb.net/${databaseName}?retryWrites=true&w=majority`;


try{
    mongoose.connect(`${server}`)
    console.log('Database connected successfully.')
}
catch(err){
    console.log('Database connection error.')
}




