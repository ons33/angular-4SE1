import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/service/residence.service';


@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent  {
  residenceId: number | null = null;  // ID de la résidence à afficher
  residence: Residence | undefined;   // Objet contenant les détails de la résidence
  listResidences: Residence[] = [];   // Liste de toutes les résidences
  currentResidenceIndex: number = 0;  // Index de la résidence actuelle dans la liste

  constructor(
    private activatedRoute: ActivatedRoute,
    private residenceService: ResidenceService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la résidence depuis les paramètres de l'URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.residenceId = id ? +id : null; // Convertir l'ID en nombre


        this.loadResidenceDetails();

  }

  loadResidenceDetails(): void {

    if (this.residenceId !== null) {
      this.residenceService.getResidenceById(this.residenceId).subscribe(
        (data: Residence) => {
          this.residence = data;  // Stocker les détails de la résidence
          this.setCurrentResidenceIndex();  // Définir l'index de la résidence actuelle
        },
        error => {
          console.error('Erreur lors de la récupération de la résidence:', error);
        }
      );
    }
  }

  setCurrentResidenceIndex(): void {
    // Trouver l'index de la résidence dans la liste
    const index = this.listResidences.findIndex(res => res.id === this.residenceId);
    if (index !== -1) {
      this.currentResidenceIndex = index;  // Mettre à jour l'index de la résidence actuelle
    }
  }

  previousResidence(): void {
    if (this.currentResidenceIndex > 0) {
      this.residenceId = this.listResidences[this.currentResidenceIndex - 1].id;
      this.loadResidenceDetails();  // Recharger les détails de la résidence précédente
    }
  }

  nextResidence(): void {
    if (this.currentResidenceIndex < this.listResidences.length - 1) {
      this.residenceId = this.listResidences[this.currentResidenceIndex + 1].id;
      this.loadResidenceDetails();  // Recharger les détails de la résidence suivante
    }
  }
}
