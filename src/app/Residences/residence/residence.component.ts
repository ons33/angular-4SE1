import { Component } from '@angular/core';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/core/service/residence.service';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.css']
})
export class ResidenceComponent {



  searchItem="";
  listResidences:Residence[]=[];


    listFavoris: Residence[] = [];
visiblity=false;
vv! :string;



constructor(private residenceService : ResidenceService){}

ngOnInit(){
  this.residenceService.getresidences().subscribe(data => {
    this.listResidences = data;
  })
}







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
