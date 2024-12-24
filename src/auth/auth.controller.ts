import { Controller, Post, Body, UseGuards, Get, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GetRoleDto, LoginDto, SignupDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { authorize } from 'passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  @ApiBody({ type: SignupDto })
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('permissions/by-role')
  @ApiBody({ type: GetRoleDto })
  async getRolePermissions(@Body() getRoleDto: GetRoleDto) {
    return this.authService.getRolePermissions(getRoleDto.role_id);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Headers('authorization') authorization: string) {
      const token = authorization.replace('Bearer ', '');
      return this.authService.logout(token);
  }
}