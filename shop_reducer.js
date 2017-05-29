import {normalize} from 'normalizr'
import Immutable from 'seamless-immutable'

import {orderSchema} from './schema'
import {DESERIALIZE_ORDER} from './shop_actions'

const initialState = Immutable({
  entities: {},
  result: []
})

export default function shopReducer (state = initialState, action) {
  switch (action.type) {
    case DESERIALIZE_ORDER:
      const normalizedOrder = normalize(action.payload, {order: orderSchema})
      const nextState = Immutable.merge(state, normalizedOrder)
      return nextState
  }
  return state
}
