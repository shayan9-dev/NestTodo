import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder().
  setTitle('Todo - Api').
  setDescription('This is Todo-Api').
  setVersion('2.0').
  addBearerAuth({
    type:'http',
    scheme:'bearer',
    bearerFormat:'JWT',
    name:'JWT',
    description:'Enter auth key',
    in:'header'
  },'jwt auth')

.build();
const document = SwaggerModule.createDocument(app , config );
SwaggerModule.setup('api',app ,document)

await app.listen(3000);

}
bootstrap();
