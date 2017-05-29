export const DESERIALIZE_ORDER = 'DESERIALIZE_ORDER'
export const deserializeOrder = order => {
  return {
    type: DESERIALIZE_ORDER,
    payload: {
      order
    }
  }
}
