import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHorizontalPosition } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
    baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUrl);
  }

  create(todo: Todo): Observable<Todo>{
    const url = `${this.baseUrl}/create`;
    return this.http.post<Todo>(url, todo);
  }

  update(todo: Todo): Observable<Todo> {
    const url = `${this.baseUrl}/${todo.id}`;
    return this.http.put<Todo>(url , todo);
  }

  delete(id: any): Observable<void>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
