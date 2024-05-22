import { model } from 'mongoose'
import { ISupplier, SupplierSchema } from './models/supplier'
import { CommoditySchema, ICommodity } from './models/commodity'
import { IProduct, ProductSchema } from './models/product'
import { IPlot, PlotSchema } from './models/plot'
import { IInvite, InviteSchema } from './models/invite'
import { FarmerSchema, IFarmer } from './models/farmer'
import { CorporationSchema, ICorporation } from './models/corporation'

export const Invite = model<IInvite>('Supplier', InviteSchema)
export const Product = model<IProduct>('Supplier', ProductSchema)
export const Commodity = model<ICommodity>('Supplier', CommoditySchema)
export const Corporation = model<ICorporation>('Supplier', CorporationSchema)
export const Supplier = model<ISupplier>('Supplier', SupplierSchema)
export const Farmer = model<IFarmer>('Supplier', FarmerSchema)
export const Plot = model<IPlot>('Supplier', PlotSchema)
