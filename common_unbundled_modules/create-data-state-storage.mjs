import omit from './omit.mjs';

const createDataStateStorage = ( initialDataState, defaultDataStateKeyValues ) => {
  let __dataState = initialDataState;
  let __keySubscribers = {};
  let __subscriberActions = {};
  let __subscriberKeys = {};

  /**
   * @param { undefined } input
   * @returns { Object }
   */
  const getDataState = () => __dataState;

  /**
   * @param { Object } dataState
   * @returns { Object }
   */
  const setDataState = dataState => {
    __dataState = Object.assign( {}, dataState );
    return __dataState;
  };

  /**
   * @param { String } key
   * @returns { * }
   */
  const get = key => __dataState[ key ];

  /**
   * @param { Object } o updated key values
   * @returns { undefined }
   */
  const set = o => {
    __dataState = Object.assign( {}, __dataState, o );
    /* updated key values */
    const entriesOfUpdatedKeyValuesObject = Object.entries( o );
    const entriesOfSubscriberKeys = Object.entries( __subscriberKeys );
    for ( const [ s, keys ] of entriesOfSubscriberKeys ){
      const g = {};
      for ( const key of keys ){
        if ( o.hasOwnProperty( key ) === true ) {
          g[ key ] = o[ key ];
        };
      };
      if ( Object.keys( g ).length > 0 ){
        if ( typeof __subscriberActions[ s ] === 'function' ) {
          /* g - updated key values only */
          __subscriberActions[ s ]( g );
        };
      };
    };
  };

  /**
   * @param { Array<String> } keys 
   * @param { String } name 
   * @param { Function } action 
   * @returns { undefined }
   */
  const setSubscriber = ( keys, name, action ) => {
    for ( const key of keys ){
      if ( __keySubscribers[ key ] === undefined ){
        __keySubscribers[ key ] = [ name ];
      } else {
        __keySubscribers[ key ].push( name );
      };
      if ( __subscriberActions[ name ] === undefined ){
        __subscriberActions[ name ] = action;
      };
      if ( __subscriberKeys[ name ] === undefined ){
        __subscriberKeys[ name ] = [ key ];
      } else {
        __subscriberKeys[ name ].push( key );
      };
    };
  };

  /**
  @param { Array<String> } keys - keys of data state
  @param { String } name - component name
  **/
  const unsetSubscriber = ( keys, name ) => {
    delete __subscriberActions[ name ];
    delete __subscriberKeys[ name ];
    for ( const key of keys ){
      __keySubscribers[ key ] = __keySubscribers[ key ].filter( cn => cn !== name );
    };
  };

  return { defaultDataStateKeyValues, setDataState, getDataState, get, set, setSubscriber, unsetSubscriber };
};

export default createDataStateStorage;