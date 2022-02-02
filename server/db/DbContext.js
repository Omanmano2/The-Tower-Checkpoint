import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from '../models/TowerEvent'
import { CommentSchema } from "../models/Comment";
import { AttendeeSchema } from "../models/Attendee";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts')
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema)

  Comments = mongoose.model('Comment', CommentSchema)

  Attendees = mongoose.model('Attendee', AttendeeSchema)
}

export const dbContext = new DbContext()
