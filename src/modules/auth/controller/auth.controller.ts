import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() req): Promise<{ token: string }> {
    const oldToken = req.headers.authorization.split(' ')[1];
    return this.authService.refreshToken(oldToken);
  }
}
