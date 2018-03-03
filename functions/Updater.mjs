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
  componentDidUpdate(){
  }
  render(){
    return createElement( this.props.children, { ...this.state, defaultDataStateKeyValues: this.props.defaultDataStateKeyValues, set: this.props.set } )
  }
}