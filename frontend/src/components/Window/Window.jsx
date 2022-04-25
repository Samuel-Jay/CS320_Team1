import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './Window.css';
import CloseIcon from '@mui/icons-material/Close';
import Close from '@mui/icons-material/Close';
import {IconButton} from '@mui/material'
/*import {closeTask} from "../../../actions/Task.js";*/
function Window(){
    const dispatch = useDispatch()
    const Window = useSelector(state => state.task.openTask);
    function closeWindow(){
        dispatch(closeTask());
    }
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
