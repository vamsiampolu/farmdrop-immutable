import {schema} from 'normalizr'

const productSchema = new schema.Entity('products')

const lineItemSchema = new schema.Entity('lineItems', {
  product: productSchema
})

const orderSchema = new schema.Entity('orders', {
  lineItems: [lineItemSchema]
})

export {orderSchema, lineItemSchema, productSchema}
