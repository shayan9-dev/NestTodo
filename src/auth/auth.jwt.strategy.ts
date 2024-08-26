import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly configservice:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:configservice.get('JWT-KEY')
        })
    }

   async validate(payload:any){

    return{
        id:payload.id,
        name:payload.name,
        email:payload.email,
        username:payload.username,
        role:payload.role
    }
   
    }

}