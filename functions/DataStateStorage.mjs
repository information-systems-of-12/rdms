import omit from './omit.mjs'

/**
@param { object } initialDataState
@param { object } defaultDataStateKeyValues
**/
export default ( initialDataState, defaultDataStateKeyValues ) => {

  let __dataState = initialDataState
  let __keySubscribers = {}
  let __subscriberActions = {}
  let __subscriberKeys = {}


  
  const getDataState = () => __dataState


  /**
  @param { object } dataState
  **/
  const setDataState = dataState => {
    __dataState = Object.assign( {}, dataState )
    return __dataState
  }



  /**
  @param { string } key
  **/
  const get = key => __dataState[ key ]




  /**
  @param { object } o
  **/
  const set = o => {

    __dataState = Object.assign( {}, __dataState, o )
    const entriesOfUpdatedKeyValuesObject = Object.entries( o )

    const entriesOfSubscriberKeys = Object.entries( __subscriberKeys )

    for ( const [ s, keys ] of entriesOfSubscriberKeys ){
      const g = {}

      for ( const key of keys ){
        if ( o.hasOwnProperty( key ) === true ){
          g[ key ] = o[ key ]
        }
      }

      if ( Object.keys( g ).length > 0 ){

        if ( typeof __subscriberActions[ s ] === 'function' ) {
          __subscriberActions[ s ]( g )

        }
        
      }

    }

  }




  /**
  @param { array of strings } keys
  @param { string } name
  @param { function } action
  **/
  const setSubscriber = ( keys, name, action ) => {

    for ( const key of keys ){

      if ( __keySubscribers[ key ] === undefined ){
        __keySubscribers[ key ] = [ name ]

      } else {
        __keySubscribers[ key ].push( name )
      }

      if ( __subscriberActions[ name ] === undefined ){
        __subscriberActions[ name ] = action
      }

      if ( __subscriberKeys[ name ] === undefined ){
        __subscriberKeys[ name ] = [ key ]

      } else {
        __subscriberKeys[ name ].push( key )
      }

      
    }

  }





  /**
  @param { array of strings } keys - keys of data state
  @param { string } name - component name
  **/
  const unsetSubscriber = ( keys, name ) => {

    delete __subscriberActions[ name ]
    delete __subscriberKeys[ name ]

    for ( const key of keys ){
      __keySubscribers[ key ] = __keySubscribers[ key ].filter( cn => cn !== name )
      
    }

  }


  return { defaultDataStateKeyValues, setDataState, getDataState, get, set, setSubscriber, unsetSubscriber }



}