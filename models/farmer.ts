import { Schema } from 'mongoose'
import { IInvite } from './invite'
import { IPlot } from './plot'

export interface IFarmer {
  _id: Schema.Types.ObjectId
  name: string
  invites: IInvite['_id'][]
  plots: IPlot['_id'][]
}

export const FarmerSchema = new Schema<IFarmer>({
  name: { type: String, required: true },
  invites: [{ type: Schema.Types.ObjectId, ref: 'Invite', required: true }],
  plots: [{ type: Schema.Types.ObjectId, ref: 'Plot', required: true }],
})
