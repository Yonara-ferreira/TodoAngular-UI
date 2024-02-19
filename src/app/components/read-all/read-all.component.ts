import { Component,OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrl: './read-all.component.css'
})
export class ReadAllComponent implements OnInit {

    list: Todo[] = [];
    listFinished: Todo[] = [];
    
    constructor(private service : TodoService ) {}

    closed = 0;

    ngOnInit(): void {
      this.findAll();
    }

    findAll(): void {
      this.service.findAll().subscribe((resposta) =>{
        resposta.forEach(todo =>{
          if(todo.completed){
            this.listFinished.push(todo);
          } else {
            this.list.push(todo);
          }
        })
        this.closed = this.listFinished.length;
      })
    }

    countClosed(): void{
      for(let todo of this.list){
        if(todo.completed){
          this.closed++;
        }
      }
    }

    delete(id: any): void{
      this.service.delete(id).subscribe((resposta) => {
        if(resposta === null){
          this.service.message('Task Delete!');
          this.list = this.list.filter(todo => todo.id !== id);
        }
      });
    }

}
