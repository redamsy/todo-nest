import { v4 as uuidV4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserProfile, Prisma, UserPassword } from '@prisma/client';

@Injectable()
export class UserClient {
  constructor(private prisma: PrismaService) {}

  // userProfile table
  public async getUserProfileByEmail(
    email: string,
  ): Promise<UserProfile | undefined> {
    return this.prisma.userProfile.findUnique({
      where: { email },
    });
  }

  public async getUserProfileById(userId: string): Promise<UserProfile | null> {
    const userProfile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });
    if (!userProfile) {
      throw new NotFoundException();
    }
    return userProfile;
  }

  public async createUserProfile(
    email: string,
    name: string,
  ): Promise<UserProfile> {
    const id = uuidV4();

    return this.prisma.userProfile.create({
      data: {
        userId: id,
        email,
        name,
      },
    });
  }

  // userPassword table
  public async getUserPasswordByEmail(
    email: string,
  ): Promise<UserPassword | undefined> {
    const userPassword = await this.prisma.userPassword.findUnique({
      where: { email },
    });
    if (!userPassword) {
      throw new NotFoundException();
    }
    return userPassword;
  }

  public async createUserPassword(
    userId: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.prisma.userPassword.create({
      data: {
        userId,
        email,
        password,
      },
    });
  }
}
