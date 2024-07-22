import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/user.dto';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  // User Methods
  getAllUsers(): Promise<CreateUserDto[]> {
    return this.userService.findAll();
  }

  getUser(id: string): Promise<CreateUserDto> {
    return this.userService.findOne(id);
  }

  createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.create(createUserDto);
  }

  updateUser(id: string, createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.update(id, createUserDto);
  }

  deleteUser(id: string): Promise<void> {
    return this.userService.remove(id);
  }

  // Other Methods 
  

}
