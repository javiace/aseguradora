import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import {createPolicy, claimPolicy, setMessage} from '../Redux'

const FormNew = (props) =>{

    console.log(props)

    const handleSubmit = (event) => {
        console.log('handleSubmit init funct')
        const form = event.currentTarget;
        
        console.log(props)
        console.log(form.name.value);

        event.preventDefault();

        let payload = {name:form.name.value, 
                       amount:Number(form.amount.value)}

        if (props.tipo === 'poliza') {
            props.createPolicy(payload)
        }else if (props.tipo === 'reclamo'){
            props.claimPolicy(payload)
        }
        
        props.setMessage({variant: 'success', 
                          text:'se creó '+props.tipo+' para <<'+form.name.value+'>> correctamente'})
        

        form.reset()
        
      };
    
      function getTitle(){
          if (props.tipo === 'poliza') {
              return 'Nueva Póliza'
          }else if (props.tipo === 'reclamo'){
                return 'Nuevo Reclamo'
          }else
            return 'Nuevo'
      }
    
    if(props.currView === 'Form_'+props.tipo) {
        let comp = (
        <Form onSubmit={handleSubmit}>
            <center><h1>{getTitle()}</h1></center>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Escriba el nombre" name="name"/>                
            <Form.Label>Monto</Form.Label>
            <Form.Control type="text" placeholder="Escriba el monto" name="amount"/>
            <Button variant="primary" type="submit">Crear</Button>
        </Form>
        );
        
        return comp
    }else
        return (<div/>)
        
}


const mapStateToProps = (state) => {
    return {
       ...state /*
        currView: state.currView,
        totalAmount: state.totalAmount,
        claimHistory: state.claimHistory,
        policies: state.policies*/
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    createPolicy: (payload) => dispatch(createPolicy(payload)),
    claimPolicy: (payload) => dispatch(claimPolicy(payload)),
    setMessage: (payload) => dispatch(setMessage(payload))
  });

export default connect(mapStateToProps,mapDispatchToProps)(FormNew)