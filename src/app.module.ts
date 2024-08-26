import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';





@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,envFilePath:['.local.env']}),
          TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(configservice:ConfigService)=>({
              type:'postgres',
              host:configservice.get('DATABASE-HOST'),
              port:configservice.get('DATABASE-PORT'),
              username:configservice.get('DATABASE-USERNAME'),
              password:configservice.get('DATABASE-PASSWORD'),
              database:configservice.get('DATABASE-NAME'),
              synchronize:configservice.get('DATABASE-SYNC'),    
              entities:[__dirname + '/**/*.entity{.ts,.js}']
            })
          })  ,UserModule ,AuthModule, TodoModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
