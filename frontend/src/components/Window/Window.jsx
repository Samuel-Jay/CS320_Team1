import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './Window.css';
function Window(){
    const dispatch = useDispatch()
    const Window = useSelector(state => state.task.openTask);
    
    return (
        Window != null ?(
            <div className='Display_box'>
                  <div className ='Sender'>
                      <h5>{Window.assignerEmail}</h5>
                      <h6>{Window.dueDate.split("T")[0].split("-")[1]+"/"+Window.dueDate.split("T")[0].split("-")[2]+"/"+Window.dueDate.split("T")[0].split("-")[0]}</h6>
                  </div>
                  <div className ='Header'>
                      <h3>{Window.taskName+":"}</h3>
                  </div>
                  <div className='Description'>
                      <p>{Window.taskDescription}</p>
                  </div>
                  <div className="Details">
                      <h5>{"Details:"}</h5>
                  </div>
              </div>
          ):(
              <></>
          )
    )

}

    export default Window;
