import { IInvite } from './invite'
import { Schema, Document } from 'mongoose'

export interface IPlot extends Document {
  _id: Schema.Types.ObjectId
  filename: string
  original_filename: string
  uploaded_at: Date
  inviteIds: IInvite['_id'][]
}

export const PlotSchema: Schema = new Schema<IPlot>({
  filename: { type: String, required: true },
  original_filename: { type: String, required: true },
  uploaded_at: { type: Schema.Types.Date, default: Date.now, required: true },
  inviteIds: [{ type: Schema.Types.ObjectId, ref: 'Invite', require: true }],
})
