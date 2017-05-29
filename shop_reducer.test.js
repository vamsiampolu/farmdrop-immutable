import reducer from './shop_reducer'
import {orderSchema} from './schema'
import {deserializeOrder} from './shop_actions'
import {denormalize} from 'normalizr'

/* global describe, it, beforeEach, expect */
const fakeOrder = {
  id: 10,
  lineItems: [
    {
      id: 483,
      quantity: 2,
      product: {
        id: 924,
        name: 'Carrots',
        price: 1.50
      }
    }
  ]
}

describe('shopReducer', () => {
  let state

  beforeEach(() => {
    const action = deserializeOrder(fakeOrder)
    state = reducer(undefined, action)
  })

  it('should deserialize order correctly', () => {
    const actual = state.entities.orders[10]
    const expected = {
      id: 10,
      lineItems: [483]
    }
    expect(actual).toEqual(expected)
  })

  it('should deserialize the line items correctly', () => {
    const actual = state.entities.lineItems[483]
    const expected = {
      id: 483,
      quantity: 2,
      product: 924
    }
    expect(actual).toEqual(expected)
  })

  it('should deserialize product correctly', () => {
    const actual = state.entities.products[924]
    const expected = {
      id: 924,
      name: 'Carrots',
      price: 1.50
    }
    expect(actual).toEqual(expected)
  })

  it('should denormalize order correctly', () => {
    const actual = denormalize(state.result.order, orderSchema, state.entities)
    console.log('DENORMALIZED', actual)
    const expected = fakeOrder
    expect(actual).toEqual(expected)
  })
})
