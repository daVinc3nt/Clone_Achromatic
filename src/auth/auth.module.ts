// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [JwtAuthGuard],
})
export class AuthModule {}
