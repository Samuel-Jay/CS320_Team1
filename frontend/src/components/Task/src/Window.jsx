import react from 'react'
import './Window.css';
function Window (task){
    return (
        <div className='Display_box'>
            <div className ='Sender'>
                <h5>{task.task.assignerEmail}</h5>
                <h6>{task.task.dueDate.split("T")[0].split("-")[1]+"/"+task.task.dueDate.split("T")[0].split("-")[2]+"/"+task.task.dueDate.split("T")[0].split("-")[0]}</h6>
            </div>
            <div className ='Header'>
                <h3>{task.task.taskName+":"}</h3>
            </div>
            <div className='Description'>
                <p>{task.task.taskDescription}</p>
            </div>
            <dov className="Details">
            <h5>{"Details:"}</h5>
            </dov>
        </div>
    )

}

export default Window;
