import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/service/users/users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body('password') password: string, @Body('username') username: string): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }
}
