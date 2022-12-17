import {
  Injectable,
  InternalServerErrorException,
  forwardRef,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { UserPassword, UserProfile } from '@prisma/client';
import { either } from 'fp-ts';
import { PasswordService } from '../auth/password.service';
import { UserClient } from './user.client';

@Injectable()
export class UserService {
  constructor(
    private readonly userClient: UserClient,
    @Inject(forwardRef(() => PasswordService))
    private passwordService: PasswordService,
  ) {}

  async getUserProfileById(userId: string): Promise<UserProfile | undefined> {
    return this.userClient.getUserProfileById(userId);
  }

  async getUserProfileByEmail(email: string): Promise<UserProfile | undefined> {
    const userProfile = await this.userClient.getUserProfileByEmail(email);
    if (!userProfile) {
      throw new NotFoundException();
    }
    return userProfile;
  }

  async getUserPasswordByEmail(
    email: string,
  ): Promise<UserPassword | undefined> {
    return this.userClient.getUserPasswordByEmail(email);
  }

  public async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<UserProfile> {
    try {
      const existingUserProfile = await this.userClient.getUserProfileByEmail(
        email,
      );
      if (existingUserProfile) {
        return Promise.reject(
          new InternalServerErrorException(`Error email already used`),
        );
      }

      const createdUserProfile = await this.userClient.createUserProfile(
        email,
        name,
      );
      if (!createdUserProfile) {
        return Promise.reject(
          new InternalServerErrorException(
            `Unknown error occurred creating user profile`,
          ),
        );
      }
      const encryptedPassword = await this.passwordService.hashPassword(
        password,
      );
      await this.userClient.createUserPassword(
        createdUserProfile.userId,
        email,
        encryptedPassword,
      );
      return createdUserProfile;
    } catch (e) {
      return Promise.reject(
        new InternalServerErrorException(
          `Unknown error occurred creating user profile with error code ${e.code}`,
        ),
      );
    }
  }
}
