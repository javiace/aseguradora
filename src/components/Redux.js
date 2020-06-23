import { combineReducers } from 'redux'


const initState = {currView: '',
                  msg:{variant: 'primary', text:'Bienvenido!'},
                  totalAmount: 1000,
                  listPolicies: ['Juan','Pedro'],
                  listOfClaims: ['Toño'] 
                  }

//const Redux = () => {

    //Action creator
  export const changeView =(payload) => {
      return {type: 'CHANGE_VIEW',
              payload: payload
      }
  }

  export const setMessage =(payload) => {
      return {type:'SET_MESSAGE',
             payload: payload  
      }
  }
    
  export const createPolicy = (payload) => {
        console.log('createPolicy init func')
        return {
            type: 'CREATE_POLICY',
            payload: payload
        }
    }

   export const deletePolicy = (name) => {
        return {
            type: 'DELETE_POLICY',
            payload: name
        }
    }

    export const claimPolicy = (payload) => {
        return {
            type: 'CREATE_CLAIM',
            payload: payload
        }
    }

    //Reducers
    const view = (state = initState.currView, action) => {
        switch(action.type){
            case "CHANGE_VIEW":
                 return action.payload
            default:
                 return state
        }
    }

    const msg = (state = initState.msg, action) => {
        switch(action.type){
            case "SET_MESSAGE":
                return action.payload
            case "CHANGE_VIEW":
                return Object.assign(initState.msg,{text:''})
            default:
                    return state
        }
    }

    const policies = (state = initState.listPolicies, action) => {
        console.log('policies init func')
        console.log('state=',state,'action=',action)
        //let newState = Object.assign(initState,state)
        let listPolicies = state

        switch(action.type){
            case "CREATE_POLICY":
                 return [...listPolicies, action.payload.name]
            case "DELETE_POLICY":
                 return listPolicies.filter((name) => { return name !== action.payload } )
            default:
                 return listPolicies
        }
        
        //return Object.assign(state,{listPolicies:listPolicies})
    }

    const bank = (totalAmount = initState.totalAmount, action) => {
        switch(action.type){
            case "CREATE_POLICY":
                let newAmount = totalAmount + action.payload.amount
                return newAmount
            case "CREATE_CLAIM":
                return totalAmount - action.payload.amount
            default: 
                return totalAmount
        }
    }

    const claimHistory = (state = initState.listOfClaims, action) => {
        let listOfClaims = state
        switch(action.type){
            case "CREATE_CLAIM":
                return [...listOfClaims, action.payload.name]
            default:
                return listOfClaims
        }
    }
/*
    const departments = combineReducers({
        totalAmount: bank,
        claimHistory: claimHistory,
        policies: policies
    })

    const store = createStore(departments)

    console.log(store.getState())

    store.dispatch(createPolicy('Manuel', 100))
    store.dispatch(createPolicy('Andres', 200))
    store.dispatch(createPolicy('Luis', 500))
    
    console.log(store.getState())

    store.dispatch(claimPolicy('Luis', 10))

    console.log(store.getState())
    
    store.dispatch(deletePolicy('Manuel'))
    
    console.log(store.getState().policies)

    return ( <div/> )
}*/

//export default Redux
export const reducers = combineReducers({
    currView: view,
    message: msg,
    totalAmount: bank,
    listPolicies: policies,
    listOfClaims: claimHistory
})