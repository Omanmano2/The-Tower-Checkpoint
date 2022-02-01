import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from '../models/TowerEvent'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts')
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema)
}

export const dbContext = new DbContext()
