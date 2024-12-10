import { Module, MiddlewareConsumer } from '@nestjs/common';
import * as session from 'express-session';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma.service';
import { LocalStrategy } from './local.strategy';
import * as passport from 'passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    if (!process.env.SESSION_SECRET) {
      throw new Error('SESSION_SECRET environment variable is not set');
    }
    consumer
      .apply(
        session({
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
