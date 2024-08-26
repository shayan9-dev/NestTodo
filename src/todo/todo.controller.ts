import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @ApiBearerAuth('jwt auth')
  @UseGuards(AuthGuard("jwt"))
  @Post(':userid')
  create(@Body() createTodoDto: CreateTodoDto,@Param('userid') userid:string) {
    return this.todoService.create(createTodoDto,userid);
  }
  
  @ApiBearerAuth('jwt auth')
  @UseGuards(AuthGuard("jwt"))
  @Get('/completed/:userid')
  findcompletedtodos(@Param('userid') userid: string) {
    return this.todoService.findcompletedtodo(userid);
  }

  @ApiBearerAuth('jwt auth')
  @UseGuards(AuthGuard("jwt"))
  @Get(':userid')
  findnotcompletedtodos(@Param('userid') userid: string) {
    return this.todoService.findNotCompletedTodo(userid);
  }
 
  @ApiBearerAuth('jwt auth')
  @UseGuards(AuthGuard("jwt"))
  @Patch(':id')
  updatetodo(@Param('id') id:string){
      return this.todoService.updatetodo(id)
  }
  @ApiBearerAuth('jwt auth')
  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
