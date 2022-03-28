import { Checkbox } from '@mui/material';
import React,{useState} from 'react';
import "./Task_row.css";
import CircleCheckedOutline from "@mui/icons-material/CheckCircle"
import CircleUncheckedOutline from "@mui/icons-material/RadioButtonUnchecked"
import { color } from '@mui/system';
const Task_row = () => {
    const[background,setbackground] = useState("#ffff");
    function change_background(){
        setbackground("#F0F2F5");
    }
  return (
    <div className='EmailRow' style={{backgroundColor:background}} onClick={change_background}>
        <Checkbox defaultChecked size="small" icon = {<CircleCheckedOutline/>} checkedIcon = {<CircleUncheckedOutline />}>
        </Checkbox>
        <h3 className = " EmailRow_title">
            {"Employee_Name"}
        </h3>
        <div className = "EmailRow_Subject">
            <h4>
                {"Personal time off request!! "} 
                <span className='EmailRow_Description'>
                     {"- Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"}
                </span>
            </h4>
        </div>
        <div className ="time">
            10pm
        </div>
    </div>
  );
}
export default Task_row;