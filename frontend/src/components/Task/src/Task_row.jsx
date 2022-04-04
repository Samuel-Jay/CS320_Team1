import { Checkbox } from '@mui/material';
import "./Task_row.css";
import "./indiTask.jsx";
import CircleCheckedOutline from "@mui/icons-material/CheckCircle";
import CircleUncheckedOutline from "@mui/icons-material/RadioButtonUnchecked";
import List from "@mui/material/List";
import {useSelector} from 'react-redux';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {changeDisp} from '../../../actions/Task.js';
const Task_row = () => {
    const[background,setbackground] = useState("#ffff");
    const dispatch = useDispatch();
    const flexContainer ={
        display:'flex',
        flexDirection: 'row',
        backgroundColor: background,
        padding: 10,
    };
    function change_background(){
        setbackground("#F0F2F5");
    }
    function open_task()
    {
        change_background();
        dispatch(changeDisp())
    }
    function change_status(task)
    {
        if(task.get("status")=="incomplete")
        {
            task.changeStat("complete");
        }
        else
        {
            task.changeStat("incomplete");
        }
    }
    function list_items(status)
    {
        const taskList=useSelector((state ) => state.task.taskList)
        console.log(taskList)
        return taskList.map(task=>
            {
                if(task.get("status")==status){
                    <div className='EmailRow' style={{ backgroundColor: background }} onClick={open_task()}>
                    <Checkbox defaultChecked size="small" onChange={change_status(task)} icon={<CircleCheckedOutline />} checkedIcon={<CircleUncheckedOutline />}>
                    </Checkbox>
                    <h3 className=" EmailRow_title">
                        {task.get("name")}
                    </h3>
                    <div className="EmailRow_Subject">
                        <h4>
                            {task.get("subject")}
                            <span className='EmailRow_Description'>
                                {task.get("description")}
                            </span>
                        </h4>
                    </div>
                    <div className="time">
                        {task.get("time")}
                    </div>
                    </div>
                }
            })
    }
  return (
    <><List style={flexContainer}>
          <ListItem button onClick={list_items("incomplete")}><ListItemText align="center" primary="Uncompleted Tasks"/> </ListItem>
          <ListItem button onClick={list_items("complete")}><ListItemText align="center" primary="Completed Tasks"/> </ListItem>
          <ListItem button onClick={list_items("archive")}><ListItemText align="center" primary="Archived Tasks"/> </ListItem>
      </List>
      <List>
        {list_items("incomplete")}
      </List>
      </>
  );
}
export default Task_row;
