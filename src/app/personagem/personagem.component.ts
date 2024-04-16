import { JogoComponent } from './../jogo/jogo.component';
import { Component, Input, OnInit, EventEmitter, Injectable, Output } from '@angular/core';
import { CharacterService } from '../services/character.service';
import * as CryptoJS from 'crypto-js';

enum Player {
  X = 'X',
  O = 'O',
}

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
  errorMessage: string = '';
  player1Selected: boolean = false;
  player2Selected: boolean = false;
  @Input() currentPlayer: Player;
  @Output() charactersSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  static charactersSelected: any;


  constructor(private characterService: CharacterService, private JogoComponent: JogoComponent) { }

  searchCharacter(playerNumber: number) {
    const name = playerNumber === 1 ? this.player1Name : this.player2Name;
    if (name.trim() === '') return; // Não realiza a busca se o nome estiver vazio
    this.characterService.getCharacterByName(name).subscribe((data: any) => {
      if (playerNumber === 1) {
        this.player1Selected = true;
      } else if (playerNumber === 2) {
        this.player2Selected = true;
      }

      if (this.player1Selected && this.player2Selected) {
        this.charactersSelected.emit(true);
      }
      if (data.data.results.length > 0) {
        if (playerNumber === 1) {
          this.character1 = data.data.results[0];
        } else {
          this.character2 = data.data.results[0];
        }
        this.errorMessage = ''; // Limpa a mensagem de erro
      } else {
        this.errorMessage = 'Personagem não encontrado'; // Define a mensagem de erro
      }
    });
  }

  checkCharactersSelected() {
    if (this.player1Name !== '' && this.player2Name !== '') {
      this.charactersSelected.emit(true);
    } else {
      this.charactersSelected.emit(false);
    }
  }
}