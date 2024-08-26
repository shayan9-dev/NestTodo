import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){

  }
  
 async create(createUserDto: CreateUserDto) {
   const user:User = new User();
   user.name= createUserDto.name
   user.email= createUserDto.email
   user.username= createUserDto.username
   user.role = 'NORMAL_USER';
   const salt = await bcrypt.genSalt(10)
   user.password= await bcrypt.hash(createUserDto.password,salt)
   
   return this.userRepository.save(user);
  }

  findAll() {
    return this. userRepository.find() ;
  }


  findOne(id: string) {
    return this.userRepository.findOne({where:{id:id}});
  }
   
  
 
  remove(id: number) {
    return this .userRepository.delete(id);
  }


  findbyemail(email:string){
  return this.userRepository.findOne({where:{email:email}})
  }

}
