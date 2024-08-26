import { Todo } from "src/todo/entities/todo.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"



@Entity()
export class User {

   @PrimaryGeneratedColumn()
   id:string

   @Column()
   name:string

   @Column()
   email:string

   @Column()
   username:string

   @Column()
   password:string
   
   @Column()
   role:string  
   
   
   @OneToMany(()=>Todo,(todo)=>todo.user)
  todos:Todo[]
 
}
