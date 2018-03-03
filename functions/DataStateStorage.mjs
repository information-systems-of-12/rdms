export default ( initialDataState, defaultDataStateKeyValues ) => {
  let __dataState = initialDataState
  const getDataState = () => __dataState
  const setDataState = dataState => {
    __dataState = Object.assign( {}, dataState )
    return __dataState
  }
  const get = key => __state[ key ]
  const set = o => {
    __dataState = Object.assign( {}, __dataState, o )
  }
  return { getDataState, setDataState, get, set, defaultDataStateKeyValues }
}