import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // GET /user
  @Get()
  getUsers(@Query('name') name: string): unknown {
    return this.userService.findAllUsers(name);
  }

  // GET /user/id
  @Get(':id')
  getUserById(@Param('id') id: string):unknown {
    return this.userService.findOneUser(Number(id))
  }

  // POST /user
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.createUser(createUserDto)
  }

  // PUT /user/id
  @Put(':id')
  updateUser(@Param(':id') id: string, @Body() updateUserDto: UpdateUserDto):unknown {
    return this.userService.updateUser(Number(id), updateUserDto)
  }
}
