import { Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/service/users/users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() userDto: UserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userDto.password, saltOrRounds);
    const result = await this.usersService.createUser(userDto.username, hashedPassword);
    return result;
  }
}
