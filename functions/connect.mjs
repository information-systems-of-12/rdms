import * as React from 'react'
const Component = React.default.Component
const createElement = React.default.createElement
import { dataStateStorageContext } from './contexts.mjs'
import Updater from './Updater.mjs'

/**
@param { array of strings } dataStateKeyNames
@param { react component } Container
**/
export default dataStateKeyNames => Container => {

  class Linker extends Component {
    
    constructor( props ){
      super( props )
    }

    render(){
      return createElement( dataStateStorageContext.Consumer, {},
        dataStateStorage => {
          return createElement( Updater, { 
          dataStateKeyNames,
          dataStateStorage,
          containerProps: this.props,
          containerChildren: this.props.children
        }, Container )
      } )
    }

  }
  

  for ( const key of Object.keys( Container ) ){
    Linker[ key ] = Container[ key ]
  }

  return Linker
  
}