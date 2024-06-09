import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;

  
}

export class updateUserDto {
  @IsString()
  public email: string;
  
}
