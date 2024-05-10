import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css'
})
export class NewItemComponent {

  public itemForm: FormGroup;

  constructor(private itemService: ItemService) {
    this.itemForm = new FormGroup({
    "invNumber": new FormControl(null, [Validators.required, Validators.minLength(3), this.validateInvNumber]),
    "name": new FormControl("asf", Validators.required),
    "type": new FormControl(null),
    "responsibleEmployeeId": new FormControl(null),
    //masyvas is html input elementu
    "locations": new FormArray([]),
    });
  }

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
    const field= new FormControl(null, Validators.required);
    //laukelis ikeliamas i laukeliu masyva
    (this.itemForm.get("locations") as FormArray).push(field);
  }

  public removeLocationField() {
    (this.itemForm.get("locations") as FormArray).removeAt(-1)

  }

}
