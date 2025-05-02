const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(()=>{
        console.log('Connection successful')
    })
    .catch(err=>{
        console.log(`Error occurred : ${err.message}`)
    })

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        minLength:3,
        required:true
    },
    number:{
        type:String,
        validate:{
            validator: (number)=>{
                if(number.length>8){
                    const arr= number.split('-')

                    if(arr.length>2){
                        return false
                    }

                    if(arr[0].length===2&&arr[1].length>=6){
                        return true 
                    }

                    if(arr[0].length===3&&arr[1].length>=5){
                        return true 
                    }
                }
                return false
            },
        },
        required:true
    }
       
})


personSchema.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)


