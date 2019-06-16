import * as react from 'react'
const { createElement, useState, useContext } = react.default;

import { dataStateStorageContext } from './contexts.mjs';
import Updater from './updater.mjs';

const connect = ( dataStateKeyNames ) => ( Container ) => {
  const Linker = ( props ) => {
    const dataStateStorage = useContext( dataStateStorageContext );
    return createElement( Updater, {
        dataStateKeyNames,
        dataStateStorage,
        containerProps: props,
        containerChildren: props.children
      },
      Container
    );
  };
  const propertyNames = Object.getOwnPropertyNames( Container );
  for ( const propertyName of propertyNames ) {
    if ( propertyName !== 'length' && propertyName !== 'prototype' && propertyName !== 'name' && propertyName !== 'getDerivedStateFromProps' ) {
      Linker[ propertyName ] = Container[ propertyName ];
    };
  };
  for ( const key of Object.keys( Container ) ) {
    Linker[ key ] = Container[ key ];
  };

  return Linker;
};

export default connect;