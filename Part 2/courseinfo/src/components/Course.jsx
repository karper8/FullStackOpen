import React from "react";

const Header = (props) =>{
    return(
     <>
       <h2>{props.course}</h2>
     </>
    )
}
   
const Part = (props) =>{
    return(
      <>
        <p>{props.part} {props.exercises}</p>
      </>
    )
}
   
const Content = (props) =>{
    return(
      <>
        {/* Looping over each object of parts array inside of each object of the courses array to create a part element 
        for each of the part */}
        {props.course.parts.map(part=>{
          return(
            <Part  key={part.id}part={part.name} exercises={part.exercises} />
          )
        })}
      </>
    )
}
  
  
const Total = (props) =>{ 
    // Calculates the total number of exercises inside of each parts array
    let sum = props.course.parts.reduce((total,part)=>total+=part.exercises,0)
    console.log(sum)


    return(
        <>
        <b>Total of {sum} exercises</b>
        </>
    )
}
  
const Course = (props) =>{
    return(
        <>
        {/* Looping over each object in the courses array to create a seperate view for each obejct. 
        A single object of the courses arrary is passed in as the props to all the sub components Header,Content and Total*/}
        {props.courses.map(course=>{
            return(
            <div key={course.id}>
                <Header course={course.name} />
                <Content course={course} />
                <Total course={course} />
            </div>
            )
        })}
        </>
    )
}

export default Course