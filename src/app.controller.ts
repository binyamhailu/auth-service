import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class AppController {
  
  async myRoute(@Request() req) {
    // Access the authenticated user using `req.user` 
    // Do something here
  }
}

