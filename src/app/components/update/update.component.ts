import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  todo: Todo = {
    title: '',
    description: '',
    completionDate: new Date(),
    completed: false
  }

  constructor(private service: TodoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
    
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((resposta) =>{
      this.todo = resposta;
    })
  }

  update(): void {
    this.service.update(this.todo).subscribe(
        (resposta) => {
            this.service.message('Update successful');
            this.router.navigate(['']);
        },
        (err) => {
            this.service.message('Error updating to-do');
            this.router.navigate(['']);
        }
    );
}
  cancelar(): void {
    this.router.navigate(['']);
  }

    formataData(): void {
      let data = new Date(this.todo.completionDate);
      const dia = ('0' + data.getDate()).slice(-2);
      const mes = ('0' + (data.getMonth() + 1)).slice(-2); 
      const ano = data.getFullYear();

      this.todo.completionDate = `${dia}/${mes}/${ano}`;
  }


}
