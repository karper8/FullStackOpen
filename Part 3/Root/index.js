const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const http = require('http')
const morgan = require('morgan')



const password = process.argv[2]


const Note = require('./models/note')
console.log(Note)

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
morgan.token('body',function(req,res){return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let notes = [
    {
        id:"1",
        content:"HTML is easy",
        important: true
    },
    {
        id:"2",
        content:"Browser can execute only javascript",
        important: false
    },
    {
        id:"3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/',(request,response) =>{
    response.send('<p>Hello World! </p>')
})

app.get('/api/notes',(request,response)=>{
    Note.find({})
        .then(notes =>{
            response.json(notes)
        })
})


app.get('/api/notes/:id',(request,response,next)=>{
   Note.findById(request.params.id)
    .then(note=>{
        if(note){
            response.json(note)
        }else{
            response.status(404).end()
        }
    })
    .catch(error=>{
        next(error)
    })
})

const generateId = () =>{
    const MaxId = notes.length > 0
    ? Math.max(...notes.map(n=>Number(n.id)))
    : 0

    return String(MaxId + 1)
}

app.post('/api/notes',(request,response,next)=>{
    
    const body = request.body
  

    if(!body.content){
        return response.status(400).json({
            error:'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    })

    note.save()
        .then(savedNote=>{
            response.json(savedNote)
        })
        .catch(error=>next(error))
})

app.delete('/api/notes/:id',(request,response)=>{
    Note.findByIdAndDelete(request.params.id)
     .then(result=>{
        response.status(204).end()
     })
     .catch(error => next(error) )
})

app.put('/api/notes/:id',(request,response,next) => {
    const body = request.body

    const note = {
        content : body.content,
        important : body.important,
    }

    Note.findByIdAndUpdate(request.params.id,note,{new:true})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if( error.name === 'ValidationError'){
        return response.status(400).json({ error : error.message })
    }
  
    next(error)
  }
  
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
