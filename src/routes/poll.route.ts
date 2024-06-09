import { Router } from 'express';
import authMiddleware from '@/middlewares/auth.middleware';
import PollController from '@/controllers/poll.controller';
import { Routes } from '@/interfaces/routes.interface';

class PollRoute implements Routes {
    public path = '/polls';
    public router = Router();
    public pollController = new PollController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}/user`,authMiddleware,this.pollController.getPollResponseOfUserController);
        this.router.get(`${this.path}/poll/user`,authMiddleware,this.pollController.getAllUserCreatedPoll)
        this.router.post(`${this.path}`, authMiddleware, this.pollController.createPollController);
        this.router.get(`${this.path}/:id`,authMiddleware, this.pollController.getPollByIdcontroller);
        this.router.post(`${this.path}/:id/response`,authMiddleware,this.pollController.pollResponseController);
        this.router.post(`${this.path}/:id/comment`,authMiddleware,this.pollController.commentOnPollController);
        this.router.post(`${this.path}/:id/comments`,authMiddleware,this.pollController.getAllCommentOfPollController)
    }
}

export default PollRoute;