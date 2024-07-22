import { Controller, Get, Put, Post, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './user/dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers() {
    return this.appService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.appService.getUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param(':id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.appService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

}
