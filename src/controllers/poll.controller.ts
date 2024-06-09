import { NextFunction, Request, Response } from 'express';
import pollService from '@/services/poll.service';

class PollController {
  public pollService = new pollService();

  public createPollController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const userData = req.body;
      const newPoll = await this.pollService.createPoll(userData, user);
      res.status(200).json({ data: newPoll, message: 'new poll created' });
    } catch (error) {
      next(error);
    }
  };

  public getPollByIdcontroller = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pollId = req.params.id;
      const newPoll = await this.pollService.getpollById(pollId);
      res.status(200).json({ data: newPoll, message: 'poll data  recived' });
    } catch (error) {
      next(error);
    }
  };

  public getPollResponseOfUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const newPoll = await this.pollService.getpollResponseByuser(user);
      res.status(200).json({ data: newPoll, message: 'user poll data  recived' });
    } catch (error) {
      next(error);
    }
  };

  public getAllUserCreatedPoll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const allpollofUser = await this.pollService.getpollOfuser(user);
      res.status(200).json({ data: allpollofUser, message: 'all poll' });
    } catch (err) {
      next(err);
    }
  };
  public pollResponseController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const pollId = req.params.id;
      console.log(pollId);
      const userData = req.body.optionId;
      const newPoll = await this.pollService.pollResponse(userData, user, pollId);
      res.status(200).json({ data: newPoll, message: 'response submited' });
    } catch (error) {
      next(error);
    }
  };

  public commentOnPollController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const pollId = req.params.id;
      const userData = req.body.text;
      const newPoll = await this.pollService.commentOnPoll(pollId, userData, user);
      res.status(200).json({ data: newPoll, message: 'new comment created on poll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllCommentOfPollController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const newPoll = await this.pollService.GetAllCommentOnPoll(user);
      res.status(200).json({ data: newPoll, message: 'All comment of that poll' });
    } catch (error) {
      next(error);
    }
  };
}

export default PollController;
