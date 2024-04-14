import { Component, Input, OnInit, EventEmitter, Injectable } from '@angular/core';
import { JogoComponent } from '../jogo/jogo.component';
import { CharacterService } from '../character.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-personagem',
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class PersonagemComponent {
  privateKey: any;
  publicKey: any;
  character1: any;
  character2: any;
  player1Name: string;
  player2Name: string;

  constructor(private characterService: CharacterService) { }

  searchCharacter(name: string, playerNumber: number) {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString();

    this.characterService.getCharacterByName(name).subscribe((data: any) => {
      if (data.data.results.length > 0) {
        if (playerNumber === 1) {
          this.character1 = data.data.results[0];
        } else {
          this.character2 = data.data.results[0];
        }
      } else {
        // Fazer logica para nao encontrado
      }
    });
  }
}