import axios from 'axios'

const Note = ({ note, toggleImportance}) => {
  const label = note.important  ? 'make not important' : 'make important' 

  // const toggleImportanceOf = note.id => {
  //   const url = `http://localhost:3001/notes/${note.id}`
  //   const note = notes.find(n => note.id === n.id)
  //   const changedNote = {...note, importance: !note.importance}

  //   axios.put(url,changedNote).then(response => {
  //     setNotes(notes.map(n => note.id !== n.id ? n : response.data))
  //   })
  // }

    return (
      <div>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </div>
    )
}
  
export default Note