// import { Controller, Get } from '@nestjs/common';

// @Controller()
// export class AppController {
//   constructor() {}

// }

import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Public } from './Decorators/publicEndpoint.decorator';
import { User } from './Decorators/user.decorator';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}

  // we flag this rout as public since JwtAuthGuard is globally set in app.Module
  // protected route by email/password combination
  // generate and get access_token
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/sigin')
  async signIn(@User() { userId }: any, @Request() req) {
    return this.authService.signIn(req.user.userId);
  }

  // protected route by jwt
  // return user data from jwt(access_token)
  @UseGuards(JwtAuthGuard)
  @Get('self')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
