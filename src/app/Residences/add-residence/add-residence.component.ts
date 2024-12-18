import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/service/residence.service';

@Component({
  selector: 'app-add-residence',
  templateUrl: './add-residence.component.html',
  styleUrls: ['./add-residence.component.css']
})
export class AddResidenceComponent implements OnInit {

  addResidenceForm!: FormGroup;
  isEditMode: boolean = false;
  residenceId: number | null = null;
  listResidences: Residence[] = [];

  constructor(private fb: FormBuilder,private router: Router,private residenceService: ResidenceService,private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
     // Récupérer l'ID depuis l'URL
     const id = this.activatedRoute.snapshot.queryParamMap.get('id');

    this.addResidenceForm = this.fb.group({
      id: [{ value: null }],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', Validators.required],
      status: ['', Validators.required]
    });



    if (id) {
      this.isEditMode = true;
      this.residenceId = +id;

      // Appel au service pour récupérer les données de la résidence
      this.residenceService.getResidenceById(this.residenceId).subscribe(
        (data: Residence) => {
          console.log(data);
          this.addResidenceForm.patchValue({
            id:data.id,
            name: data.name,
            address: data.address,
            image: data.image,
            status: data.status
          });
        },
        (error) => {
          console.error("Erreur lors de la récupération de la résidence :", error);
        }
      );
    } else {

      this.addResidenceForm.patchValue({ id: this.generateRandomId() });
    }
  }



  // Méthode pour ajouter ou mettre à jour une résidence
  saveResidence(): void {
    if (this.addResidenceForm.valid) {
      const residence: Residence = this.addResidenceForm.value;

      if (this.isEditMode) {

        if (this.residenceId) {

          this.residenceService.updateResidence(residence).subscribe(
            () => {
              alert('Résidence mise à jour avec succès');
              this.router.navigate(['/residences']);
            },
            (error) => console.error('Erreur lors de la mise à jour de la résidence', error)
          );
        }
      } else {
        // Ajout de résidence
        this.residenceService.addResidence(residence).subscribe(
          () => {
            alert('Résidence ajoutée avec succès');
            this.router.navigate(['/residences']);
          },
          (error) => console.error('Erreur lors de l\'ajout de la résidence', error)
        );
      }
    }
  }
// Fonction pour générer un ID unique
generateRandomId(): string {
  return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
}

  // Méthode pour gérer les appartements dans le tableau
  get Apartments() {
    return this.addResidenceForm.get('Apartments') as FormArray;
  }

  addApartment(): void {
    this.Apartments.push(
      this.fb.group({
        name: ['', Validators.required],
        size: ['', Validators.required]
      })
    );
  }

  removeApartment(index: number): void {
    this.Apartments.removeAt(index);
  }
}
