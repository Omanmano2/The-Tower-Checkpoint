import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController"
import { commentsService } from "../services/CommentsService"

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:commentId', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }



  async remove(req, res, next) {
    try {
      await commentsService.removeComment(req.params.commentId, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}