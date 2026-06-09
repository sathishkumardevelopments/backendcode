require('dotenv').config()
const mongoose = require('mongoose')

const connectDatabase = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URL).then(() => {
            console.log('OK')
        })
    }catch(err){
        console.error(err,"Database not connected")
    }
}

module.exports = connectDatabase