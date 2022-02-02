import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from "../db/DbContext"
import { attendeesService } from "../services/AttendeesService"
import BaseController from '../utils/BaseController'

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:attendeeId', this.remove)

  }
  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const create = await attendeesService.createAttendee(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const deletedAttendee = await attendeesService.deleteAttendee(req.params.attendeeId, req.userInfo.id)
      return res.send(deletedAttendee)
    } catch (error) {
      next(error)
    }
  }
}

