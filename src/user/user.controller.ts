import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private authservice:AuthService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user:User = await this.userService.create(createUserDto);
    const payload={
         id:user.id,
         name:user.name,
         email:user.email,
         username:user.username,
         role:user.role
         
    }
    return this.authservice.generatetoken(payload);
  }

  @ApiBearerAuth('jwt auth')
  @Get()
  @UseGuards(AuthGuard("jwt"))
  findAll() {
    return this.userService.findAll();
  }
  @ApiBearerAuth('jwt auth')
  @Get(':id')
  @UseGuards(AuthGuard("jwt"))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth('jwt auth')
  @Delete(':id')
  @UseGuards(AuthGuard("jwt"))
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
