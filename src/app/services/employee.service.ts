import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public employees: Employee[] = [];

  constructor(private http: HttpClient) { 

  }

  public addEmployee(e: Employee) {
    return this.http.post("https://inventorizacija-64277-default-rtdb.europe-west1.firebasedatabase.app/employees.json", e);
  }

  public loadEmployees() {
    return this.http.get<{[key: string]: Employee}>("https://inventorizacija-64277-default-rtdb.europe-west1.firebasedatabase.app/employees.json")
    .pipe(
      map((data): Employee[] => {
        let employees = [];
        for (let z in data) {
          employees.push({...data[z], id: z});
        }
        this.employees = employees;
        return employees;
      }
    ))

  }
}
