import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Residence } from '../models/residence';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {

  constructor( private http: HttpClient) { }

  residenceUrl ='http://localhost:3000/residences';

  getresidences(){
    return this.http.get<Residence[]>(this.residenceUrl);
  }
  addResidence(residence: Residence){
    return this.http.post(this.residenceUrl, residence);
  }
  deleteResidence(id: number){
    return this.http.delete(`${this.residenceUrl}/${id}`);
  }
  getResidenceById(id: number){
    return this.http.get<Residence>(`${this.residenceUrl}/${id}`);
  }
  updateResidence(residence: Residence) {

    return this.http.put(`http://localhost:3000/residences/${residence.id}`, residence);

  }
}
