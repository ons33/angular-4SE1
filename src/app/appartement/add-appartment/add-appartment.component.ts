import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Apartment } from 'src/app/core/models/appartement';
import { Residence } from 'src/app/core/models/residence';

@Component({
  selector: 'app-add-appartment',
  templateUrl: './add-appartment.component.html',
  styleUrls: ['./add-appartment.component.css']
})
export class AddAppartmentComponent {
  apartForm: FormGroup;
  newApart: Apartment = {  // Déclaration de la propriété newApart
    apartNum: 0 ,
    floorNum: 0,
    surface: 0,
    terrace: true,
    surfaceterrace: 0,
    category: '',
    ResidenceId: 0
  };
  residences:Residence[]=[
    {id:1,"name": "El fel","address":"Borj Cedria",
    "image":"../../assets/images/R1.jpg", status: "Disponible"},
    {id:2,"name": "El yasmine",
    "address":"Ezzahra","image":"../../assets/images/R2.jpeg", status:
    "Disponible" },
    {id:3,"name": "El Arij",
    "address":"Rades","image":"../../assets/images/R3.jpg", status:
    "Vendu"},
    {id:4,"name": "El Anber","address":"inconnu",
    "image":"../../assets/images/R4.jpg", status: "En Construction"}
    ];

    ///methode1 (formGroup + formControl)
    aForm = new FormGroup({
        apartNum: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        floorNum: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        surface: new FormControl('', Validators.required),
        terrace: new FormControl('yes', Validators.required),
        surfaceTerrace: new FormControl('', Validators.required),
        category: new FormControl('S+1', Validators.required),
        residence: new FormControl('', Validators.required),
      });

      ///methode2 (formBuilder)
  constructor(private fb: FormBuilder) {

  this.apartForm = this.fb.group({
  apartNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    floorNum: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    surface: ['', Validators.required],
    terrace: ['yes', Validators.required],
    surfaceTerrace: ['', Validators.required],
    category: ['S+1', Validators.required],
    residence: ['', Validators.required]
  });
  }

  onAdd() {
    if (this.apartForm.valid) {
      const newApart = this.apartForm.value;

      console.log(newApart);
    }
  }

  onReset() {
    this.apartForm.reset({
      terrace: 'yes',
      category: 'S+1'
    });
  }

}
