import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';


@Injectable()
export class TodoService {
  completetodo(userid: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(Todo) private readonly TotoRepository:Repository<Todo>,
                  private readonly userService:UserService){

  }
  //create
 async create(createTodoDto: CreateTodoDto,userid:string) {
    let todo:Todo = new Todo();
    todo.todo = createTodoDto.title;
    todo.completed = false;
    todo.date = new Date().toString();
    todo.user =  await this.userService.findOne(userid)

    return this.TotoRepository.save(todo) ;
  }
//find not completed todos
  findNotCompletedTodo(userid:string) {
    return this.TotoRepository.find({
      relations:['user'],
      where:{user:{id:userid},completed:false}
    }) ;
  }

  //find completed todo

  findcompletedtodo(userid:string){
    return this.TotoRepository.findOne({relations:['user'],
      where:{user:{id:userid},completed:true}
   
    })
  }
  updatetodo(id:string){
    return this.TotoRepository.update(id,{completed:true})

  }
  

 // delete todo by id
  remove(id: string) {
    return this.TotoRepository.delete(id);
  }
}
