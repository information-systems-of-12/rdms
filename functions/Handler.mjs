import * as React from 'react'
const Component = React.default.Component
const createElement = React.default.createElement

import { dataStateContext, defaultDataStateKeyValuesContext, setContext } from './contexts.mjs'

export default class Handler extends Component {
  constructor( props ){
    super( props )
    this.state = this.props.dataStateStorage.getDataState()
    this.set = this.set.bind( this )
  }
  render(){
    return createElement( dataStateContext.Provider, { value: this.state }, 
      createElement( defaultDataStateKeyValuesContext.Provider, { value: this.props.dataStateStorage.defaultDataStateKeyValues },
        createElement( setContext.Provider, { value: this.set },
          this.props.children ? this.props.children : createElement( 'p', {}, 'no output' )
        )
      )
    )
  }

  set( obj ){
    this.setState( obj )
    this.props.dataStateStorage.setDataState( this.state )
  }

}