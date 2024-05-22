import { Schema } from 'mongoose'

export enum CommodityType {
  Cattle,
  Cocoa,
  Coffee,
  Palm_oil,
  Rubber,
  Soy,
  Wood,
}

export interface ICommodity {
  _id: string
  name: CommodityType
}

export const CommoditySchema: Schema = new Schema<ICommodity>({
  name: {
    type: Number,
    enum: Object.values(CommodityType),
    required: true,
  },
})
