import mongoose, { ConnectOptions } from 'mongoose'
import { Farmer, Invite, Plot, Product, Supplier } from './model_index'
import { Request, Response } from 'express'
import { InviteEntity } from './models/invite'
import multer from 'multer'

const express = require('express')
const app = express()

const PORT = 5005
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/liveEO-project'

app.use(express.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

async function connectToMongoDB() {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    console.log(
      `Connected to MongoDB! Database name: '${connection.connections[0].name}'`,
    )
  } catch (err) {
    console.error('Error connecting to MongoDB: ', err.message)
  }
}

connectToMongoDB()

app.post(
  '/invitation-farmers/:productId/:commodityId',
  async (req: Request, res: Response) => {
    const { productId, commodityId } = req.params

    try {
      const product = await Product.findById(productId).populate('commodities')

      if (!product) {
        return res.status(404).send('Product not found')
      }

      const commodity = product.commodities.find(
        (commodity) => commodity._id.toString() === commodityId,
      )

      if (!commodity) {
        return res
          .status(404)
          .send(`This product doesn't contain any commodity from EUDR`)
      }

      const suppliers = await Supplier.find({ products: productId }).populate(
        'farmers',
      )

      const farmers = suppliers.flatMap((supplier) => supplier.farmers)

      const invites = farmers.map((farmer) => ({
        sender: InviteEntity.Supplier,
        receiver: InviteEntity.Farmer,
        lineId: `${productId}-${commodityId}`,
        created_at: new Date(),
      }))

      const createdInvites = await Invite.insertMany(invites)

      const farmerUpdatePromises = farmers.map((farmer, index) => {
        return Farmer.findByIdAndUpdate(
          farmer._id,
          { $push: { invites: createdInvites[index]._id } },
          { new: true },
        )
      })

      await Promise.all(farmerUpdatePromises)

      res.status(200).send('Invites sent to farmers')
    } catch (error) {
      res.status(500).send(error.message)
    }
  },
)

app.post(
  '/submission-plot/:farmerId/:inviteId',
  upload.single('plotFile'),
  async (req: Request, res: Response) => {
    const { farmerId, inviteId } = req.params
    const file = req.file

    if (!file) {
      return res.status(400).send('No file uploaded')
    }

    try {
      const newPlot = new Plot({
        filename: file.filename,
        original_filename: file.originalname,
        inviteIds: [inviteId],
      })

      const savedPlot = await newPlot.save()

      await Farmer.findByIdAndUpdate(
        farmerId,
        { $push: { plots: savedPlot._id } },
        { new: true },
      )

      res.status(200).send('Plot information submitted successfully')
    } catch (error) {
      res.status(500).send(error.message)
    }
  },
)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
