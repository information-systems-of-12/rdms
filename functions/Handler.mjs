import * as React from 'react'
const Component = React.default.Component
const createElement = React.default.createElement

import { dataStateStorageContext } from './contexts.mjs'

export default class Handler extends Component {
  constructor( props ){
    super( props )
  }
  render(){
    return createElement( dataStateStorageContext.Provider, { value: this.props.dataStateStorage },
      this.props.children ? this.props.children : null
    )

  }

}