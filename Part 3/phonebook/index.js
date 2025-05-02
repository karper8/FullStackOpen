const express  = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const axios = require('axios')
const http = require('http')
const request = require('request')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body',function(req,res){return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons',(request,response)=>{
  console.log(Person)
  Person.find({})
    .then((persons)=>{
      response.json(persons)
    })
    .catch(err=>console.log(err.message))
})

 app.get('/api/info',(request,response)=>{

    
    Person.estimatedDocumentCount().then((count)=>{
      response.send(`<p>phone book has info for ${count} people</p>
        <p>${Date(Date.now())}</p>`)
    })
   

})

app.get('/api/persons/:id',(request,response)=>{

 
  Person.findOne({_id:request.params.id})
    .then((person)=>{
      response.json(person)
    })
    .catch(err=>console.log(err.message))
 

})

app.delete('/api/persons/:id',(request,response)=>{
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((err) => {
      next(err)
    })
  

})

const IdGen = () =>{
  const id = Math.floor(Math.random() * (100 - 0)  + 4)
  return id
}

app.post('/api/persons/', (request,response)=>{

  if(!request.body.name){
    return response.status(400).json({'error':'Name is missing'})
  }

  if(!request.body.number){
    return response.status(400).json({'error':'Number is missing'})
  }

  //Checks whether the given name already exists in the phonebook
  Person.findOne({ name: request.body.name})
    .then(res => {
      //If the given name already exists then a put request is made to update the number
      if(res){

        const newdata = {
          name:request.body.name,
          number:request.body.number
        }

        const headers =  {
            'Content-Type': 'application/json'
            }

        axios.put(`http:localhost:3002/api/persons/${res.id}`,newdata,headers)
            .then(res=>{})
            .catch(err=>{
              console.log(err)
            })
      //If the name does not exist in the phonebook then a new contact is created and added.
      }else{
        let person =new  Person({
          id: String(IdGen()),
          name: request.body.name,
          number : request.body.number 
        })
      
      person.save()
        .then((person)=>{
          response.status(201).json(person)
        })
        .catch(error=>response.status(400).json(error))
      }
    })

  



})

app.put('/api/persons/:id',(request,response)=>{
  Person.findById(request.params.id)
    .then((res)=>{
      res.name = request.body.name
      res.number = request.body.number
      res.save()
        .then(res=>
          { 
            return response.status(200).json(res)
          })
        .catch(error=>console.log(error))
    })

   
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})