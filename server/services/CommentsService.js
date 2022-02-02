import { BadRequest } from '@bcwdev/auth0provider/lib/Errors'
import { dbContext } from '../db/DbContext'
import { logger } from '../utils/Logger'

class CommentsService {
  async createComment(newComment) {
    const createdComment = await dbContext.Comments.create(newComment)
    await createdComment.populate('creator', 'name picture')
    return createdComment
  }

  async getCommentByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
    if (!comments) {
      throw new BadRequest('Invalid, couldnt find comment(s)')
    }
    return comments
  }

  async removeComment(commentId, userId) {
    const original = await dbContext.Comments.findById(commentId)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('Cant delete this comment')
    }
    await original.remove()
    return original
  }
}

export const commentsService = new CommentsService()