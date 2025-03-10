import { IsEmail } from 'class-validator';

import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return this.usersService.validateUser(email,password);
  }
}
