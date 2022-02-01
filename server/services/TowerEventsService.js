import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class TowerEventsService {

  async createTowerEvent(newTowerEvent) {
    const towerEvent = await dbContext.TowerEvents.create(newTowerEvent)
    await towerEvent.populate('creator', 'name picture')
    return towerEvent
  }

  async getAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find().populate('creator', 'name picture')

    return towerEvents
  }

  async getTowerEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')
    if (!towerEvent) {
      throw new BadRequest('Invalid Event ID')
    }
    return towerEvent
  }
  async editTowerEvent(edited, eventId) {
    const originalTowerEvent = await dbContext.TowerEvents.findById(eventId)
    // TODO check to see if event is already cancelled - if it is, throw an error otherwise, let it move on
    if (originalTowerEvent.isCanceled == true) {
      throw new BadRequest('You cant edit a canceled event')
    } else {
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
      // originalTowerEvent.isCanceled = edited.isCanceled || originalTowerEvent.isCanceled

      await originalTowerEvent.save()
      return originalTowerEvent
    }
  }

  async removeTowerEvent(eventId, userId) {
    const originalTowerEvent = await dbContext.TowerEvents.findById(eventId)
    if (originalTowerEvent.creatorId.toString() !== userId) {
      throw new BadRequest('Couldnt delete tower event ')
    }
    originalTowerEvent.isCanceled = true
    await originalTowerEvent.save()
    return originalTowerEvent
  }


}

export const towerEventsService = new TowerEventsService()