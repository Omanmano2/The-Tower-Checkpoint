import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController"
import { towerEventsService } from "../services/TowerEventsService"

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.getAll)
      .get('/:towerEventId', this.getById)
      .put('/:towerEventId', this.edit)
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
      req.query.creatorId = req.userInfo.id
      const towerEvents = await towerEventsService.getAllTowerEvents(req.query)
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getTowerEventById(req.params.towerEventId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }

  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.towerEventId = req.params.towerEventId
      const updatedTowerEvent = await towerEventsService.editTowerEvent(req.body, req.params.towerEventId)
      return res.send(updatedTowerEvent)
    } catch (error) {
      next(error)
    }

  }
}