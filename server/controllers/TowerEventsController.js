import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController"
import { towerEventsService } from "../services/TowerEventsService"

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:eventId', this.getById)
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
}