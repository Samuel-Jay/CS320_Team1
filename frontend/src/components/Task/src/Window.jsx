import react from 'react'
import './Window.css';
const Window = () => {
    return (
        <div className='Display_box'>
            <div className ='Sender'>
                <h5>{"Employee Name"}</h5>
                <h6>{"Time"}</h6>
            </div>
            <div className ='Header'>
                <h3>{"Personal Request Form"}</h3>
            </div>
            <div className='Description'>
                <p>{" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"}</p>
            </div>
            <dov className="Details">
            <h5>{"Details:"}</h5>
            </dov>
        </div>
    )

}

export default Window
