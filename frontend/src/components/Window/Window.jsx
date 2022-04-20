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
                      <h5>{'From: ' +Window.assignerEmail}</h5>
                      <h6>{'Due: '+Window.dueDate.split("T")[0].split("-")[1]+"/"+Window.dueDate.split("T")[0].split("-")[2]+"/"+Window.dueDate.split("T")[0].split("-")[0]}</h6>
                  </div>
                  <div className ='Header'>
                      <h3>{Window.taskName+":"}</h3>
                  </div>
                  <div className='Details'>
                      <p>{Window.taskDescription}</p>
                  </div>

              </div>
          ):(
              <></>
          )
    )

}

    export default Window;
