import { Body, Controller, Post } from '@nestjs/common';
import { UserProfile } from '@prisma/client';
import { Public } from '../Decorators/publicEndpoint.decorator';
import { CreateUserBodyDto } from '../Models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // public route
  @Public()
  @Post()
  public async signup(
    @Body()
    { email, name, password }: CreateUserBodyDto,
  ): Promise<UserProfile> {
    return this.userService.createUser(email, name, password);
  }
}
