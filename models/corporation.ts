import { Schema } from 'mongoose'
import { IProduct } from './product'
import { ISupplier } from './supplier'

export interface ICorporation {
  _id: Schema.Types.ObjectId
  name: string
  products: IProduct['_id'][]
  suppliers: ISupplier['_id'][]
}
export const CorporationSchema: Schema = new Schema<ICorporation>({
  name: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', require: true }],
  suppliers: [{ type: Schema.Types.ObjectId, ref: 'Supplier', require: true }],
})
