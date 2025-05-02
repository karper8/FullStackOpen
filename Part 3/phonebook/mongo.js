const mongoose = require('mongoose')


const name = process.argv[3]
const number = process.argv[4]
const password = process.argv[2]


const url =`mongodb+srv://karthik10:${password}@cluster0.1yvkxkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(()=>console.log('Connected Successfuly'))
    .catch((err)=>console.log(err))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person',personSchema)

const newPerson = new Person({
    name: name,
    number: number,
})

newPerson.save()
    .then(result=>{
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
    .catch(err=>console.log(err.message))

// Person.find({name:"Anna"})
//     .then(res=>console.log(res))
//     .catch(err=>console.log(err.message))