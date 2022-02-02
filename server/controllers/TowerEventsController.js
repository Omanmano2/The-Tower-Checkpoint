import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController"
import { towerEventsService } from "../services/TowerEventsService"
import { commentsService } from "../services/CommentsService"
import { attendeesService } from "../services/AttendeesService"

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:eventId', this.getById)
      .get('/:eventId/comments', this.getCommentsById)
      .get('/:eventId/attendees', this.getAttendeesByEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:eventId', this.remove)
      .put('/:eventId', this.edit)

  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createTowerEvent(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAllTowerEvents()
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getTowerEventById(req.params.eventId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }

  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const updatedTowerEvent = await towerEventsService.editTowerEvent(req.body, req.params.eventId)
      return res.send(updatedTowerEvent)
    } catch (error) {
      next(error)
    }

  }
  async remove(req, res, next) {
    try {
      const cancelledEvent = await towerEventsService.removeTowerEvent(req.params.eventId, req.userInfo.id)
      return res.send(cancelledEvent)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsById(req, res, next) {
    try {
      const comments = await commentsService.getCommentByEventId(req.params.eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }

  }

  async getAttendeesByEvent(req, res, next) {
    try {
      const attendees = await attendeesService.getAttendenceForEvent(req.params.eventId)
      return res.send(attendees)
    } catch (error) {
      next(error)
    }
  }
}