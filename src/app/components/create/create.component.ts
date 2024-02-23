import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  todo: Todo = {
    title: '',
    description: '',
    completionDate: new Date(),
    completed: false
  }

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
  }
  create(): void {
    this.formataData();
    this.service.create(this.todo).subscribe({
        next: (resposta) => {
            this.service.message('Todo created successfully!');
            this.router.navigate(['']);
        },
        error: (err) => {
            this.service.message('Error creating to-do');
            this.router.navigate(['']);
        },
        complete: () => {
        }
    });
}


  cancelar(): void {
    this.router.navigate(['']);
  }

  // foi reestruturado o metodo dessa forma para funcionar 
  // pois da outra forma pegando pelo .get do Data o mesmo 
  // nao estava funcionando. 
  formataData(): void {
    let data = new Date(this.todo.completionDate);
    // Obtendo o dia, mês e ano com dois dígitos
    const dia = ('0' + data.getDate()).slice(-2);
    const mes = ('0' + (data.getMonth() + 1)).slice(-2); // Adicionando 1, pois o getMonth() retorna de 0 a 11
    const ano = data.getFullYear();

    // Atualizando a propriedade completionDate
    this.todo.completionDate = `${dia}/${mes}/${ano}`;
}


}
