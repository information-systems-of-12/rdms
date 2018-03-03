import * as React from 'react'
const createContext = React.default.createContext

export const dataStateContext = createContext( {} )
export const defaultDataStateKeyValuesContext = createContext( {} )
export const setContext = createContext()