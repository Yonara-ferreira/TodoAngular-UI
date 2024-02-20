import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrl: './finalizados.component.css'
})
export class FinalizadosComponent implements OnInit  {
  
  listFinished: Todo[] = [];
    
    constructor(private service : TodoService,  private router: Router ) {}

    closed = 0;

    ngOnInit(): void {
      this.findAll();
    }

    findAll(): void {
      this.service.findAll().subscribe((resposta) =>{
        resposta.forEach(todo =>{
          if(todo.completed){
            this.listFinished.push(todo);
          } 
        })

      });
    }
    voltar(): void {
      this.router.navigate([''])
    }
}
