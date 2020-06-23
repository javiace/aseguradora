import React from 'react';
import {Navbar, NavDropdown, Nav} from 'react-bootstrap'
import { connect } from 'react-redux'

import FormNew from './components/form'
import List from './components/list'
import Msg from './components/msg'
import {changeView, deletePolicy, setMessage} from './components/Redux'

const App = (props) => {
  console.log('App init func')
  console.log('props =',props)
  //console.log('state =',state)
  return (
    <div>
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Aseguradora</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      <Nav className="mr-auto">
        <NavDropdown title="Polizas" id="basic-nav-dropdown">
         <NavDropdown.Item onClick={()=>{props.changeView('Form_poliza')}}>Nueva</NavDropdown.Item>
         <NavDropdown.Divider/>
         <NavDropdown.Item onClick={()=>{props.changeView('List_poliza')}}>Mostrar</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link onClick={()=>{props.changeView('Form_finanzas')}}>Finanzas</Nav.Link>
        <NavDropdown title="Reclamos" id="basic-nav-dropdown">
         <NavDropdown.Item onClick={()=>{props.changeView('Form_reclamo')}}>Nuevo</NavDropdown.Item>
         <NavDropdown.Divider/>
         <NavDropdown.Item onClick={()=>{props.changeView('List_reclamo')}}>Mostrar</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      </Navbar>
      <div style={{display:(props.currView == 'Form_finanzas')?'block':'none'}}>
        <center>
          <h1>Balance ${props.totalAmount}</h1><br/>
          <h3>Total pólizas {props.listPolicies.length}</h3><br/>
          <h3>Total reclamos {props.listOfClaims.length}</h3><br/>
        </center>
      </div>
      <Msg msg={props.message} onCloseDo={props.setMessage}/>
      <FormNew tipo="poliza"></FormNew>
      <List tipo="poliza" 
            currView={props.currView}
            list={props.listPolicies} 
            clickDo={props.deletePolicy}>
      </List>
      <FormNew tipo="reclamo"></FormNew>
      <List tipo="reclamo"
            currView={props.currView}
            list={props.listOfClaims}>
      </List>
    </div>
  );
}

function mapStateToProps(state) {
  console.log('App.mapStateToProps init func')
  console.log('state =', state)
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeView: (payload) => dispatch(changeView(payload)),
  deletePolicy:(name) => dispatch(deletePolicy(name)),
  setMessage: (payload) => dispatch(setMessage(payload))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
