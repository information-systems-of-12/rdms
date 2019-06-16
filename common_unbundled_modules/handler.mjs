import * as react from 'react'
const { createElement } = react.default;

import { dataStateStorageContext } from './contexts.mjs';
const { Provider } = dataStateStorageContext;

const Handler = ( props ) => createElement( Provider, {
  value: props.dataStateStorage
}, props.children );

export default Handler;