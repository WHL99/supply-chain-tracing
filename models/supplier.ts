import { Schema } from 'mongoose'
import { IFarmer } from './farmer'
import { IInvite } from './invite'
import { IProduct } from './product'

export interface ISupplier {
  _id: Schema.Types.ObjectId
  name: string
  invites: IInvite['_id'][]
  farmers: IFarmer['_id'][]
  products: IProduct['_id'][]
}

export const SupplierSchema: Schema = new Schema<ISupplier>({
  name: { type: String, required: true },
  invites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
  farmers: [{ type: Schema.Types.ObjectId, ref: 'Farmer' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})
