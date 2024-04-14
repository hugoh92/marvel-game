import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js'; 

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  private publicKey = 'd72fe083427c35025a4285e0494706b1'; 
  private privateKey = 'e2a9e1518eaa42f08c8248a1f1bc4308ccce2f4e'; 

  constructor(private http: HttpClient) {}

  getCharacterByName(name: string): Observable<any> {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString(); 
    const url = `${this.baseUrl}?name=${name}&apikey=${this.publicKey}&ts=${ts}&hash=${hash}`;
    return this.http.get(url);
  }
}
