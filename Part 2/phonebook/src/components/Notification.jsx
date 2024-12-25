const Notification = ({msg}) =>{
    const Style = {
        color : 'grey',
        fontStyle : 'bold',
        fontSize : 20 ,
        borderStyle : 'solid',
        borderRadius : 5,
        padding : 10,
        marginBottom : 10

    }

    if(msg===null){
        return null
    }

    return(
        <div style={Style} className="error">
            {msg}
        </div>
    )
}

export default Notification