import { Component } from '@angular/core';
import { Residence } from 'src/app/core/models/residence';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css']
})
export class ResidencesComponent {



  searchItem="";
  listResidences:Residence[]=[
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


    listFavoris: Residence[] = [];
visiblity=false;
vv! :string;
    showLocation(r:Residence ){
      if (r.address=== "inconnu"){
        alert('adr inconnu')
      }
else{
  this.visiblity=true;
this.vv= r.name
}
    }


addFavoris(r:Residence){
  console.log(this.listFavoris);

if (this.listFavoris.includes(r)){
alert('already liked')
}
else{this.listFavoris.push(r);
console.log('tab', this.listFavoris);
}
}
}
