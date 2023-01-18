import {Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Redirect, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {EmailVerifyDto} from "./dto/email.verify.dto";
import {UserLoginDto} from "./dto/user.login.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('email-verify')
  async verifyEmail(@Query() emailVerifyDto:EmailVerifyDto){
    return this.usersService.verifyEmail(emailVerifyDto)
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto){
    console.log(userLoginDto)
    return '1'
  }

  @Get(':id')
  async getUser(@Param('id') id: string){
    console.log(`id is ${id}`)
    return '1'
  }

  @Delete(':id')
  async deleteUser(@Param('id')id: string){
    if (isNaN(+id)){
      return 'id must be a number'
    }
    return this.usersService.remove(+id)
  }
}
