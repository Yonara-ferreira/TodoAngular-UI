import { Component,OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrl: './read-all.component.css'
})
export class ReadAllComponent implements OnInit {

  closed = 0;

    list: Todo[] = [];
    listFinished: Todo[] = [];
    
    constructor(private service : TodoService, private router: Router ) {}

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

    finalizar(item: Todo): void {
      item.completed = true;
      this.service.update(item).subscribe(() => {
        this.service.message('Task Completed!');
        this.list = this.list.filter((todo) => todo.id !== item.id);
        this.closed++;
      });
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
    navegar():void{
        this.router.navigate(['finalizados']);
    }

}
