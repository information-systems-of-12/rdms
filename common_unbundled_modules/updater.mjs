import * as react from 'react'
const { createElement, useState, useEffect } = react.default;

import getUpdaterId from './get-updater-id.mjs';

const setStateByKeys = ( props, setState ) => {
  const o = getSubscribedKeyValues( props );
  setState( o );
};

const getSubscribedKeyValues = ( props ) => {
  const dataState = props.dataStateStorage.getDataState();
  const o = {};
  for ( const subscribeToField of props.dataStateKeyNames ){
    o[ subscribeToField ] = dataState[ subscribeToField ];
  };
  return o;
};

const Updater = ( props ) => {
  const id = getUpdaterId();
  const initialState = getSubscribedKeyValues( props );
  const [ state, setState ] = useState( initialState );
  useEffect( () => {
    const updateState = ( updatedKeyValues ) => {
      setState( { ...initialState, ...updatedKeyValues } );
    };
    props.dataStateStorage.setSubscriber( props.dataStateKeyNames, id, updateState );
    return () => props.dataStateStorage.unsetSubscriber( props.dataStateKeyNames, id );
  } );
  return createElement( props.children, {
    ...props.containerProps,
    ...state,
    set: props.dataStateStorage.set
  }, props.containerChildren );
};

export default Updater;