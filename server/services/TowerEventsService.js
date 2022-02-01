import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class TowerEventsService {

  async createTowerEvent(newTowerEvent) {
    const towerEvent = await dbContext.TowerEvents.create(newTowerEvent)
    await towerEvent.populate('creator', 'name description')
    return towerEvent
  }

  async getAllTowerEvents(query = {}) {
    const towerEvents = await dbContext.TowerEvents.find(query).populate('creator', 'name description')

    return towerEvents
  }

  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator', 'name description')
    if (!towerEvent) {
      throw new BadRequest('Invalid Event ID')
    }
    return towerEvent
  }
  async editTowerEvent(edited, towerEventId) {
    const originalTowerEvent = await dbContext.TowerEvents.findById(towerEventId)
    if (originalTowerEvent.creatorId.toString() !== edited.creatorId) {
      throw new BadRequest('You cant edit this')
    }
    originalTowerEvent.name = edited.name || originalTowerEvent.name
    originalTowerEvent.description = edited.description || originalTowerEvent.description
    originalTowerEvent.coverImg = edited.coverImg || originalTowerEvent.coverImg
    originalTowerEvent.location = edited.location || originalTowerEvent.location
    originalTowerEvent.capacity = edited.capacity || originalTowerEvent.capacity
    originalTowerEvent.startDate = edited.startDate || originalTowerEvent.startDate
    originalTowerEvent.type = edited.type || originalTowerEvent.type
    originalTowerEvent.isCanceled = edited.isCanceled || originalTowerEvent.isCanceled

    await originalTowerEvent.save()
    return originalTowerEvent
  }


}

export const towerEventsService = new TowerEventsService()