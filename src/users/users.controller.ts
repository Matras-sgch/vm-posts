import { Controller, Post, Body, Get, Request, UseGuards, Param, Delete, Req } from '@nestjs/common';
import { User, SignupRsp, LoginRsp } from './interfaces/user';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LogUserDTO } from './dto/log-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('signup')
  async signUp(@Body() user: CreateUserDTO): Promise<SignupRsp> {
    return await this.userService.signUp(user);
  }

  @Post('login')
  async logIn(@Body() user: LogUserDTO): Promise<LoginRsp> {
    return await this.userService.logIn(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async profile(@Request() req) {
    return req.user
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('me')
  async delProfile(@Request() req) {
    return await this.userService.deleteUser(req.user.userId)
  }
  
  

}