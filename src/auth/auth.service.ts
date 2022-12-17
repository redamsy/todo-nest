import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { UserProfile } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserProfile | null> {
    const userPassword = await this.userService.getUserPasswordByEmail(email);
    const userProfile = await this.userService.getUserProfileByEmail(email);
    const isPassword = await this.passwordService.comparePassword(
      pass,
      userPassword.password,
    );
    if (userProfile && userPassword && isPassword) {
      return userProfile;
    }
    return null;
  }

  // generate access_token
  async signIn(userId: string) {
    const userProfile = await this.userService.getUserProfileById(userId);
    const payload = {
      email: userProfile.email,
      sub: userProfile.userId,
      name: userProfile.name,
    };
    return {
      userProfile,
      access_token: this.jwtService.sign(payload),
    };
  }
}
