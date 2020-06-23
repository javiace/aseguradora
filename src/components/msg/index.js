import React from 'react'
import { Alert } from 'react-bootstrap'

const Msg =(props) => {
    if(props.msg && props.msg.text){
        return (<Alert variant={props.msg.variant}
                       onClose={() => props.onCloseDo   ({text:''})}
                       dismissible>
                {props.msg.text}
                </Alert>)
    }else
        return (<div/>)
    
}

export default Msg