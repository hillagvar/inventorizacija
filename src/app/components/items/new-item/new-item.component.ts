import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ItemService } from '../../../services/item.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css'
})
export class NewItemComponent {

  public employeeList: Employee[] = [];

  public itemForm: FormGroup;

  constructor(private itemService: ItemService, private employeeService: EmployeeService) {
    this.itemForm = new FormGroup({
    "invNumber": new FormControl(null, [Validators.required, Validators.minLength(3), this.validateInvNumber]),
    "name": new FormControl(null, [Validators.required, Validators.minLength(3)]),
    "type": new FormControl(null),
    "responsibleEmployeeId": new FormControl(null, Validators.required),
    //masyvas is html input elementu
    "locations": new FormArray([
      new FormControl(null, [Validators.required, Validators.minLength(3)])
    ]),
    });

    this.loadEmployees();
  };

  public onSubmit() {
    console.log(this.itemForm.value);
    this.itemService.addItem(this.itemForm.value).subscribe(()=> {
      this.itemForm.reset();
    })
  }

  validateInvNumber(control: FormControl) : ValidationErrors | null {
    let value = control.value;
    let pattern = /^[A-Z]{3}[0-9]{5}$/;
    if (pattern.test(value)) {
      return null;
    } 
    return {error: "Klaida"};
  }

  //paimti laukeliu location masyve esancius inputus kaip masyva
  get locations() {
    return (this.itemForm.get("locations") as FormArray).controls;
  }

//prideti naujam laukeliui
  public addLocationField() {
    //sukuriamas naujas laukelis
    const field= new FormControl(null, [Validators.required, Validators.minLength(3)]);
    //laukelis ikeliamas i laukeliu masyva
    (this.itemForm.get("locations") as FormArray).push(field);
  }

  public removeLocationField() {
    (this.itemForm.get("locations") as FormArray).removeAt(-1)

  }

  private loadEmployees() {
    this.employeeService.loadEmployees().subscribe((data) => {
    this.employeeList = this.employeeService.employees;
    //this employeeList = data?
    })
  }

}
