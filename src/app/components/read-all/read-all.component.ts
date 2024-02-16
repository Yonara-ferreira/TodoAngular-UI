import { Component,OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrl: './read-all.component.css'
})
export class ReadAllComponent implements OnInit {
    list: Todo[] =[];
    
    constructor(private service : TodoService){}

    ngOnInit(): void {
      this.findAll();
    }

    findAll(): void {
        this.service.findAll().subscribe((resposta) =>{
          this.list = resposta;
        })
    }

}
