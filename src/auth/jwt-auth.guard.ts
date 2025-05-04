import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly jwtSecret = 'secret';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: { id: string; email: string } }>();
    const token = request.cookies['jwt'];
    if (!token) {
      return false;
    }

    try {
      const payload = jwt.verify(token, this.jwtSecret) as { id: string; email: string };
      request.user = payload; // Attach user info to the request
      return true;
    } catch {
      return false;
    }
  }
}
