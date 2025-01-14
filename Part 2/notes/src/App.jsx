import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './service/notes'
import  './index.css'
import Notification from './components/Notification'

function App(props) {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState(
    'a new note...'
  )
  const [showAll,setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)

  useEffect(()=>{
    console.log('effect')
    noteService
      .getAll('/api/notes')
      .then(initialNotes=>{
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  },[])
  console.log('render',notes.length,'notes')

  

  const notesToShow = showAll ? notes : notes.filter(note=>note.important)

 
  const addNote = (event) =>{
    event.preventDefault()
    console.log('button clicked',event.target)
    const noteObject = {
      content:newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(returnedNote =>{
        console.log(response)
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    // setNotes(notes.concat(noteObject))
    // setNewNote('')
  }

  const toggleImportanceOf = (id) => {
    const url = `/api/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id,changedNote)
      .then(returnedNote => setNotes(notes.map(n => n.id !== id ? n : returnedNote)))
      .catch(err=>{
        setErrorMessage(
          `Note ${note.content} was already removed from the server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
        setNotes(notes.filter(n=>n.id !== id))
      })
  }

  const handleNoteChange = (event) =>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => {
          //DOUBT: Why are we using the paraenthesis while passing toggleImpotanceOf function through props to the Note component.
          /* If I just pass the function as a prop it is invoked each and every time the a new Note element id rendered based on 
             the number of elements in the notesToShow array */
          
          return (<Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)
        })}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App
