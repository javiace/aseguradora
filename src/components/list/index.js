import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

const List = (props) => {  
    console.log(props)

    function getTitle(){
        if (props.tipo === 'poliza') {
            return 'Lista de asegurados '
        }else if (props.tipo === 'reclamo'){
              return 'Lista de asegurados '
        }else
          return 'Listado de '+props.tipo
    }
  
  if(props.currView === 'List_'+props.tipo) {
    return(
        <Container>
            <center><h1>{getTitle()}</h1></center>
            <br/>
            {
                props.list.map((item, index) => {
                    return(
                        
                        <Row key={index}>
                            <Col sm="6">
                                {item}
                            </Col>
                            <Col sm="6">
                                <Button onClick={(name) => props.clickDo(item)}
                                        active={(props.clickDo)?true:false}
                                        disabled={(props.clickDo)?false:true}>
                                        Eliminar
                                </Button>
                            </Col>
                        </Row>
                    )
                })
            }
        </Container>
    )
   }else{
       return (<div/>)
   }
}

export default /*connect(mapStateToProps)*/(List)