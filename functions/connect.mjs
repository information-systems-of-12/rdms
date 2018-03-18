import * as React from 'react'
const Component = React.default.Component
const createElement = React.default.createElement

import { dataStateContext, defaultDataStateKeyValuesContext, setContext } from './contexts.mjs'
import Updater from './Updater.mjs'

export default dataStateKeyNames => Container => {
  // debugger
  class Linker extends Component {
    
    constructor( props ){
      super( props )
      this.state = {}
    }
    // static getDerivedStateFromProps( nextProps, prevState ){
    //   debugger
    //   return {}
    // }
    shouldComponentUpdate(nextProps, nextState){
      // debugger
      return false
    }

    render(){
      // debugger
      return createElement( dataStateContext.Consumer, {},
        dataState => createElement( defaultDataStateKeyValuesContext.Consumer, {},
          defaultDataStateKeyValues => createElement( setContext.Consumer, {},
            set => createElement( Updater, { subscribeTo: dataStateKeyNames, dataState, defaultDataStateKeyValues, set, containerProps: this.props, containerChildren: this.props.children }, Container ) 
          )
        )
      )
    }
  }

  for ( const key of Object.keys( Container ) ){
    Linker[ key ] = Container[ key ]
  }

  return Linker
  
}