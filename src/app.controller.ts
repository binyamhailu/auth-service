import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/role.enum';

@Controller()
export class AppController {
  @Post('my-route')
  @Roles(Role.ADMIN, Role.STAFF) // Only allow users with the "ADMIN" or "STAFF" roles to access this route
  @UseGuards(AuthGuard('jwt'))
  async myRoute(@Request() req) {
    // Access the authenticated user using `req.user`
    // Do something here
  }
}

