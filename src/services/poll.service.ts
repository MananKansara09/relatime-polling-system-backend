import { HttpException } from '@exceptions/HttpException';
import pollModel from '@/models/poll.model';
import userModel from '@/models/users.model';
import mongoose from 'mongoose';

class pollService {
  public users = userModel;
  public polls = pollModel;

  public async createPoll(userData, user): Promise<any> {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
      const newPoll = new this.polls({  ...userData,user:user.id });
      await newPoll.save();
      if (!newPoll) throw new HttpException(500, 'Poll not created!,try again');
      // await session.commitTransaction();
      return newPoll;
    } catch (error) {
      // await session.abortTransaction();
      throw error;
    } finally {
      // session.endSession();
    }
  }

  public async getpollById(id): Promise<any> {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
      const pollById = await this.polls.findById(id)
        .populate('user')
        .populate('options.responses')
        .populate('comments.user')
        // .session(session);
      if (!pollById) {
        throw new HttpException(400, 'Poll not found');
      }
      // await session.commitTransaction();
      return pollById;
    } catch (error) {
      // await session.abortTransaction();
      throw error;
    } finally {
      // session.endSession();
    }
  }

  public async getpollResponseByuser(user): Promise<any> {
   
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
      // Ensure user.id is an ObjectId
      if (!mongoose.Types.ObjectId.isValid(user.id)) {
        throw new HttpException(400, 'Invalid user ID');
      }
  
      const pollsOfUser = await this.polls
        .find({ 'options.responses': user.id })
        .populate('user')
        .populate('options.responses')
        .populate('comments.user')
        // .session(session);
      console.log(pollsOfUser);
      if (!pollsOfUser || pollsOfUser.length === 0) {
        throw new HttpException(400, 'User has not responded to any poll');
      }
  
      // await session.commitTransaction();
      return pollsOfUser;
    } catch (error) {
      // await session.abortTransaction();
      throw error;
    } finally {
      // session.endSession();
    }
  }
  

  public async getpollOfuser(user): Promise<any> {
   
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
      // Ensure user.id is an ObjectId
      if (!mongoose.Types.ObjectId.isValid(user.id)) {
        throw new HttpException(400, 'Invalid user ID');
      }
  
      const pollsOfUser = await this.polls
        .find({ user: user.id })
        .populate('user')
        .populate('options.responses')
        .populate('comments.user')
        // .session(session);
      if (!pollsOfUser || pollsOfUser.length === 0) {
        throw new HttpException(400, 'User has not responded to any poll');
      }
  
      // await session.commitTransaction();
      return pollsOfUser;
    } catch (error) {
      // await session.abortTransaction();
      throw error;
    } finally {
      // session.endSession();
    }
  }

  public async pollResponse(optionId, user, pollsId): Promise<any> {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
      const pollById: any = await this.polls.findById(pollsId).session(session);
      if (!pollById) throw new HttpException(404, 'Poll not found');
      const option = pollById.options.id(optionId);
      if (!option) throw new HttpException(404, 'Option not found in poll');
      if (!option.responses.includes(user.id)) {
        option.responses.push(user.id);
      }
      await pollById.save();
      // await session.commitTransaction();
      return pollById;
    } catch (error) {
      // await session.abortTransaction();
      throw error;
    } finally {
      //session.endSession();
    }
  }

  public async commentOnPoll(pollId, comment, user): Promise<any> {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
      const pollById: any = await this.polls.findById(pollId).session(session);
      if (!pollById) throw new HttpException(404, 'Poll not found');
      const message = { user: user.id, text:comment };
      pollById.comments.push(message);
      await pollById.save();
      // await session.commitTransaction();
      return pollById;
    } catch (error) {
      //await session.abortTransaction();
      throw error;
    } finally {
      //session.endSession();
    }
  }

  public async GetAllCommentOnPoll(pollId): Promise<any> {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const getAllCommentOfPoll: any = await this.polls.findById(pollId)
        .populate('comments.user')
        .session(session);
      if (!getAllCommentOfPoll) throw new HttpException(404, 'Poll not found');
      await session.commitTransaction();
      return getAllCommentOfPoll;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default pollService;
