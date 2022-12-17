import { IsDefined, IsNotEmpty, IsString, IsEmail } from 'class-validator';

interface ICreateUserBody {
  userId: string;
  email: string;
  name: string;
  password: string;
}

export class CreateUserBodyDto implements ICreateUserBody {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(userId: string, email: string, name: string, password: string) {
    this.userId = userId;
    this.email = email;
    this.name = name;
    this.password = password;
  }
}
