import { Component } from '@angular/core';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/service/residence.service';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css']
})
export class ResidenceComponent {

  searchItem = "";
  listResidences: Residence[] = [];
  listFavoris: Residence[] = [];
  visiblity = false;
  vv!: string;

  constructor(private residenceService: ResidenceService) {}

  ngOnInit() {
    this.residenceService.getresidences().subscribe(data => {
      this.listResidences = data;
    });
  }

  showLocation(r: Residence) {
    if (r.address === "inconnu") {
      alert('Adresse inconnue');
    } else {
      this.visiblity = true;
      this.vv = r.name;
    }
  }

  addFavoris(r: Residence) {
    console.log(this.listFavoris);

    if (this.listFavoris.includes(r)) {
      alert('Déjà aimé');
    } else {
      this.listFavoris.push(r);
      console.log('Favoris', this.listFavoris);
    }
  }

  deleteResidence(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette résidence ?')) {
      this.residenceService.deleteResidence(id).subscribe(
        () => {
          // Filtrer la liste pour ne plus afficher la résidence supprimée
          this.listResidences = this.listResidences.filter(residence => residence.id !== id);
          alert('Résidence supprimée avec succès');
        },
        (error) => {
          console.error('Erreur lors de la suppression de la résidence', error);
        }
      );
    }
  }
}
