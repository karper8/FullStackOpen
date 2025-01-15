const express  = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')




let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(cors())

morgan.token('body',function(req,res){return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// app.use(morgan('tiny'),morgan(':body'))
// app.use(morgan(':body'))
// app.use(morgan.token('data',function(req,res){return req.body}))
// app.use(morgan(function (tokens,req,res){
//   return req.data
// }))


app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/info',(request,response)=>{
    response.send(`<p>phone book has info for ${persons.length} people</p>
        <p>${Date(Date.now())}</p>`)

})

app.get('/api/persons/:id',(request,response)=>{

  const id = request.params.id
  let person = persons.find(p=> p.id === id)

  if(!person){
    return response.status(404).end()
  }

  response.json(person)

})

app.delete('/api/persons/:id',(request,response)=>{
  const id = request.params.id
  console.log(id)
  persons = persons.filter(p=>p.id!==id)
  response.status(204).end()

})

const IdGen = () =>{
  const id = Math.floor(Math.random() * (100 - 0)  + 4)
  return id
}

app.post('/api/persons/',(request,response)=>{

  if(!request.body.name){
    return response.status(400).json({'error':'Name is missing'})
  }

  if(!request.body.number){
    return response.status(400).json({'error':'Number is missing'})
  }

  const name = persons.find(p => p.name.toLowerCase()===request.body.name.toLowerCase())
  if(name){
    return response.status(400).json({'error':'Name must be unique'})
  }

  let person = {
    id: String(IdGen()),
    name: request.body.name,
    number : request.body.number 
  }

  persons = persons.concat(person)

  response.status(201).json(person)

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = 3002
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})