import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'

class AttendeesService {
  async getAttendeesByEvent(accountId) {
    const accountAttendee = await dbContext.Attendees.find({ accountId: accountId }).populate('event').populate('attendee', 'name picture')
    return accountAttendee
  }

  async createAttendee(newAttendee) {

    const createdAttendee = await dbContext.Attendees.create(newAttendee)
    const towerEvent = await dbContext.TowerEvents.findById(newAttendee.eventId)
    if (towerEvent.capacity == 0) {
      throw new BadRequest('Capacity is 0')
    } else {
      towerEvent.capacity -= 1
      await towerEvent.save()
      await createdAttendee.populate('account', 'name picture')
      return createdAttendee
    }
  }

  async getMyAttendence(accountId) {
    const accountAttendence = await dbContext.Attendees.find({ accountId: accountId }).populate('event').populate('event', 'name description')
    return accountAttendence
  }

  async getAttendenceForEvent(eventId) {
    const attendence = await dbContext.Attendees.find({ eventId: eventId }).populate('account', 'name picture')
    return attendence
  }

  async deleteAttendee(attendeeId, userId) {
    const original = await dbContext.Attendees.findById(attendeeId)

    if (original.accountId.toString() !== userId) {
      throw new BadRequest('You cant remove this attendee')
    }
    const towerEvent = await dbContext.TowerEvents.findById(original.eventId)
    towerEvent.capacity += 1
    await towerEvent.save()
    await original.remove()
    return original
  }
}

export const attendeesService = new AttendeesService()