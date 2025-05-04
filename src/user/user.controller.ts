import { Controller, Get, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class AuthController {
  private readonly jwtSecret = 'secret';

  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({ status: 200, description: 'User information retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@Req() req: Request & { user: { id: string; name: string; email: string } }) {
    const user = req.user; // Extracted by JwtAuthGuard
    const userDetails = await this.userService.findByEmail(user.email);
    if (!userDetails) {
      throw new BadRequestException('User not found');
    }

    return { id: userDetails.id, name: userDetails.name, email: userDetails.email };
  }
}
