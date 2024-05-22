import { Schema } from 'mongoose'
import { ICommodity } from './commodity'
import { IProduct } from './product'

export enum InviteEntity {
    Supplier,
    Farmer,
}
  
export type LineId = `${IProduct['_id']}-${ICommodity['_id']}`
  
export interface IInvite {
    _id: Schema.Types.ObjectId; 
    sender: InviteEntity
    receiver: InviteEntity
    lineId: LineId
    created_at: Date
}

export const InviteSchema: Schema = new Schema<IInvite>({
    sender: {
        type: Number,
        enum: Object.values(InviteEntity),
        required: true,
    },
    receiver: {
        type: Number,
        enum: Object.values(InviteEntity),
        required: true,
    },
    lineId: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
});