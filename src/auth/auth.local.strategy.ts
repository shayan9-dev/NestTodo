import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private readonly userService:UserService){
        super({
            usernameField:'email'
        })
    }
   
   async validate(email:LoginDto["email"],password:LoginDto["password"]){
   let user:User = await this.userService.findbyemail(email);

   if(!user) throw new UnauthorizedException("User Not Found");

   const isPasswordValid = await bcrypt.compare(password, user.password);

   if(isPasswordValid) return user;
        
   if (!isPasswordValid) {
       throw new UnauthorizedException("Password is Incorrect");
   }
   }
}