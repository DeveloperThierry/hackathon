import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'johndoe@gmail.com' },
    { id: 2, name: 'Jane Doe', email: 'janedoe@gmail.com' },
  ];

  findAllUsers(name: string = '') {
    this.logger.log("finding all users")
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLocaleUpperCase()),
    );
  }

  findOneUser(id:number){
    this.logger.log(`Finding user ${id}`)
    const user = this.users.find(user => user.id == id)
    if(!user) throw new NotFoundException("User not found")
    return user
  }

  createUser(dto:CreateUserDto){
    this.logger.log("Creating user")
    const newUser: User = {id:this.users.length + 1, email:"", ...dto}
    this.users.push(newUser)
    return dto
  }

  updateUser(id:number, dto:UpdateUserDto){
    this.logger.log(`Updating user ${id}`)

    const index = this.users.findIndex(user => user.id == id)
    if (index == -1) return null
    this.users[index] = {...this.users[index], ...dto}
    return this.users[index]
  }

  deleteUser(id:number){
    this.logger.log(`Deleting user ${id}`)

    const index = this.users.findIndex(user => user.id == id)
    if (index == -1) return null
    const [deleted] = this.users.splice(index,1)
    return deleted
  }
}
