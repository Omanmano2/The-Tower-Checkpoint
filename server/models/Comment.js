import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const CommentSchema = new Schema({
  eventId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, required: true },
  body: { type: String, required: true },
},
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})