import * as React from 'react'
const Component = React.default.Component
const createElement = React.default.createElement

export default class Updater extends Component {
  
  constructor( props ){
    super( props )
    this.state = {}
    this.name = Math.random().toString( 36 )
    this.update = this.update.bind( this )
  }

  static getDerivedStateFromProps( nextProps, prevState ){
    const o = {}
    const dataState = nextProps.dataStateStorage.getDataState()
    for ( const subscribeToField of nextProps.dataStateKeyNames ){
      if ( prevState[ subscribeToField ] !== dataState[ subscribeToField ] ){
        o[ subscribeToField ] = dataState[ subscribeToField ]
      }
    }
    return o
  }


  render(){
    return createElement( this.props.children, { ...this.state, set: this.props.dataStateStorage.set, defaultDataStateKeyValues: this.props.dataStateStorage.defaultDataStateKeyValues, ...this.props.containerProps }, this.props.containerChildren )
  }

  componentDidMount(){
    this.props.dataStateStorage.setSubscriber( this.props.dataStateKeyNames, this.name, this.update )
  }

  componentWillUnmount(){
    this.props.dataStateStorage.unsetSubscriber( this.props.dataStateKeyNames, this.name )
  }

  update( obj ){
    this.setState( obj )
  }
  
}