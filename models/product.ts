import { Schema } from 'mongoose'
import { ICommodity } from './commodity'
import { ICorporation } from './corporation'

export interface IProduct {
  _id: string
  name: string
  corporation: ICorporation
  commodities: ICommodity['_id'][]
}

export const ProductSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  corporation: {
    type: Schema.Types.ObjectId,
    ref: 'Corporation',
    required: true,
  },
  commodities: [{ type: Schema.Types.ObjectId, ref: 'Commodity' }],
})
