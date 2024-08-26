import { Body, Controller, Post, Req, UseGuards  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';


@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtservice:JwtService) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  loginuser(@Req() req,@Body()logindto:LoginDto) {
    const user:User= req.user;
    const payload={
        id : user.id,
        name:user.name,
        email:user.email,
        username:user.username,
        role:user.role
    }
    return this.jwtservice.sign(payload);
  }

}
