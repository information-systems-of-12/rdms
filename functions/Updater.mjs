import * as React from 'react'
const Component = React.default.Component
const createElement = React.default.createElement

export default class Updater extends Component {
  constructor( props ){
    super( props )
    this.state = {}
    for ( const subscribeToField of props.subscribeTo ){
      this.state[ subscribeToField ] = props.dataState[ subscribeToField ]
    }
  }
  static getDerivedStateFromProps( nextProps, prevState ){
    const o = {}
    for ( const subscribeToField of nextProps.subscribeTo ){
      if ( prevState[ subscribeToField ] !== nextProps.dataState[ subscribeToField ] ){
        o[ subscribeToField ] = nextProps.dataState[ subscribeToField ]
      }
    }
    return o
  }
  render(){
    return createElement( this.props.children, { ...this.state, set: this.props.set, defaultDataStateKeyValues: this.props.defaultDataStateKeyValues, ...this.props.containerProps }, this.props.containerChildren )
  }
}