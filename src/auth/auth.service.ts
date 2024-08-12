import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService
  ) {}

  // async validateUser(username: string, password: string): Promise<any> {
  //   const user = await this.userModel.findOne({ where: { name: username } });
  //   if (user && await bcrypt.compare(password, user.password)) {
  //     const { password, ...result } = user.get({ plain: true });
  //     return result;
  //   }
  //   return null;
  // }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ where: { name: username } });
    const plainTextPassword = password;
    const hash = await bcrypt.hash(plainTextPassword, 10); // Use the same salt rounds
    console.log('Newly Hashed Password:', hash);

    if (user) {
      console.log('Provided Password:', password);
      console.log('Stored Hash:', user.password);
      const isMatch = await bcrypt.compare(user.password, hash);
      console.log('Password Match:', isMatch);
      if (isMatch) {
        const { password, ...result } = user.get({ plain: true });
        return result;
      }
    }
    return null;
  }
  

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}