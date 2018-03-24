export default ( incomingObject, keys = [] ) => {
  const outcomingObject = {}
  const incomingObjectKeys = Object.keys( incomingObject )
  for ( const incomingObjectKey of incomingObjectKeys ){
    if ( !keys.includes( incomingObjectKey ) ) {
      outcomingObject[ incomingObjectKey  ] = incomingObject[ incomingObjectKey ]
    }
  }
  return outcomingObject
}