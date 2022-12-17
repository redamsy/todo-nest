import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToDoClient } from './Clients/ToDo.client';
import { ToDoController } from './Controllers/ToDo.controller';
import { ToDoModule } from './Modules/ToDo.module';
import { PrismaModule } from './prisma/prisma.module';
import { ToDoService } from './Services/ToDo.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserService } from './user/user.service';
import { UserClient } from './user/user.client';
import { UserController } from './user/user.controller';

@Module({
  imports: [PrismaModule, ToDoModule, AuthModule, UserModule],
  controllers: [AppController, ToDoController, UserController],
  providers: [
    AppService,
    ToDoService,
    ToDoClient,
    UserService,
    UserClient,
    // register the JwtAuthGuard as a global guard, simply flag which routes should be public using @Public()
    // https://docs.nestjs.com/security/authentication#enable-authentication-globally
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
