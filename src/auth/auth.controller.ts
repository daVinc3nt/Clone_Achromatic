import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly jwtSecret = 'secret';  // cố tình để hard code ở đây để cho dễ 

  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully signed up' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.createUser(createUserDto);
    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: '1d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return { id: user.id, name: user.name, email: user.email };
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // dùng đúng HTTP exception
    }

    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: '1d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { id: user.id, name: user.name, email: user.email };
  }
  
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
    });
    return { message: 'Logged out' };
}

}
