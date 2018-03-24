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
    // debugger
    return o
  }

  // componentWillUpdate( d1, d2, d3 ){
  //   debugger
  // }
  // shouldComponentUpdate(nextProps, nextState){
  //   // this.state
  //   // debugger
  //   // return true
  //   let result = false
  //   debugger
  //   for ( const subscribeToField of nextProps.subscribeTo ){
  //     // debugger
  //     if ( JSON.stringify( this.state[ subscribeToField ] ) !== JSON.stringify( nextProps.dataState[ subscribeToField ] ) ){
  //       return true
  //     }
  //   }

  //   return result


  //   // for ( const oldp of nextProps.dataState[ subscribeToField ] )



  // }

  // static getDerivedStateFromProps( nextProps, prevState ){
  //   debugger
  //   return {}
  // }





  shouldComponentUpdate(nextProps, nextState){

    // if ( nextProps.subscribeTo.find( e => e === 'constructions2' ) ){
      // this.state
      // nextProps
      // nextState
      
      // const newstateo = {}

      // for ( const subscribeToField of nextProps.subscribeTo ){
      //   newstateo[ subscribeToField ] = nextProps.dataState[ subscribeToField ]
      //   // if ( this.state[ subscribeToField ] !== nextProps.dataState[ subscribeToField ] ){
      //   //   o[ subscribeToField ] = nextProps.dataState[ subscribeToField ]
      //   // }
      // }
      // debugger

      // if ( JSON.stringify( this.state ) === JSON.stringify( newstateo ) && this.props.containerChildren === nextProps.containerChildren ){
      if ( JSON.stringify( this.state ) === JSON.stringify( nextState ) && this.props.containerChildren === nextProps.containerChildren ){

        // debugger
        return false
      
      } else {
        // debugger
        return true
      
      }
    // }
    // return true 
  }

    
  //   this.state
    
  //   // if ( JSON.stringify( this.state ) === JSON.stringify( nextState ) ){
  //   //   debugger
  //   //   return false
  //   // } else {
  //   //   debugger
  //   //   return true
  //   // }
  //   const newstateo = {}

  //   for ( const subscribeToField of nextProps.subscribeTo ){
  //     newstateo[ subscribeToField ] = nextProps.dataState[ subscribeToField ]
  //     // if ( this.state[ subscribeToField ] !== nextProps.dataState[ subscribeToField ] ){
  //     //   o[ subscribeToField ] = nextProps.dataState[ subscribeToField ]
  //     // }
  //   }
  //   debugger

  //    if ( JSON.stringify( this.state ) === JSON.stringify( newstateo ) ){
  //     // debugger
  //     return false
  //   } else {
  //     // debugger
  //     return true
  //   }

    
  // }
  render(){
    // debugger
    return createElement( this.props.children, { ...this.state, set: this.props.set, defaultDataStateKeyValues: this.props.defaultDataStateKeyValues, ...this.props.containerProps }, this.props.containerChildren )
  }
}