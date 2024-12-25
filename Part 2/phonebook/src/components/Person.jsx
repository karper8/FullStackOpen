const Person = ({personName,personNumber,handleDelete,personId}) =>{
    return(
        <li >
            {personName} {personNumber} <button onClick={()=>handleDelete(personId)}>Delete</button>
        </li>
    )
}

export default Person