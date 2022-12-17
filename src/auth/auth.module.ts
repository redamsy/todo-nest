import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/local.strategy';
import { JwtStrategy } from './guards/jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from './password.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' }, // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
    }),
  ],
  providers: [AuthService, PasswordService, LocalStrategy, JwtStrategy],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
