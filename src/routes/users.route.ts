import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto,updateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import upload from '@/middlewares/fileupload.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}`,[authMiddleware,validationMiddleware(updateUserDto, 'body', true),upload.single('profileImage')], this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`,[authMiddleware], this.usersController.deleteUser);
  }
}

export default UsersRoute;
