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
            },
            Container
          )
      } )
    }

  }
  
  const propertyNames = Object.getOwnPropertyNames( Container )

  for ( const propertyName of propertyNames ){
    if ( propertyName !== 'length' && propertyName !== 'prototype' && propertyName !== 'name' && propertyName !== 'getDerivedStateFromProps' ){
      Linker[ propertyName ] = Container[ propertyName ]
    }
  }

  for ( const key of Object.keys( Container ) ){
    Linker[ key ] = Container[ key ]
  }

  return Linker
  
}