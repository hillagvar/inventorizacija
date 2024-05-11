import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BirthYearValidatorDirective } from '../../../directives/birth-year-validator.directive';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, BirthYearValidatorDirective],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent {

  constructor(private employeeService: EmployeeService) {

  }

  public newEmployeeSubmit(f: NgForm) {
    console.log(f.form);

    this.employeeService.addEmployee(f.form.value).subscribe(() => {
      f.reset();
    });

  }

}
