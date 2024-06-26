import { PersonagemComponent } from './../personagem/personagem.component';
import { Component, OnInit, EventEmitter, Output, Injectable, Input } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { ScoreService } from '../services/score.service';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';


export enum Player {
  X = 'X',
  O = 'O',
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})

export class JogoComponent implements OnInit {
  board: Player[][];
  currentPlayer: Player;
  winner: Player | null;
  player1Name = '';
  player2Name = '';
  privateKey: any;
  publicKey: any;
  player1Selected: boolean = false;
  player2Selected: boolean = false;
  charactersSelected: boolean = false;

  constructor(private characterService: CharacterService, private scoreService: ScoreService) { }

  ngOnInit() {
    Swal.fire({
      title: ('Jogo da velha MARVEL'),
      text:('Cada Jogador digita um personagem marvel, clica em buscar e começa o jogo!'),
      icon: 'info',
      position: 'center'
    });
  }

  determineFirstPlayer() {
    // Gere um número aleatório entre 0 e 1
    const random = Math.random();
    // Se o número aleatório for menor que 0.5, o jogador 1 começa; caso contrário, o jogador 2 começa
    this.currentPlayer = random < 0.5 ? Player.X : Player.O;
    const startingPlayer = this.currentPlayer === Player.X ? 'Jogador 1' : 'Jogador 2';
    Swal.fire({
      title: (startingPlayer + ' começa jogando.'),
      icon: 'info',
      position: 'center'
    });
  }

  updateCharactersSelected(event: boolean) {
    this.charactersSelected = event;
    if (this.charactersSelected) {
      setTimeout(() => {
        this.initializeGame(); // Iniciar o jogo quando os personagens estiverem selecionados
      }, 1);
    }
  }


  initializeGame() {
    this.board = Array(3).fill(null).map(() => Array(3).fill(null));
    this.determineFirstPlayer();
    this.winner = null;
  }

  makeMove(row: number, col: number) {
    console.log("Personagens inválidos. O jogo não pode ser iniciado.");
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      this.checkWinner(row, col);
      if (this.winner) {
        setTimeout(() => {
          Swal.fire({
            title: ('O Jogador ' + (this.currentPlayer === Player.O ? '1' : '2') + ' ganhou.'),
            icon: 'success',
            position: 'center'
          }).then(() => {
            // Ação a ser executada após o fechamento do primeiro popup
            this.scoreService.updateScore(this.winner);
            this.initializeGame();
          });
        }, 100);

      }
      this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
    }
  }

  checkWinner(row: number, col: number) {
    // Verifica se horizontais estao iguais
    if (this.board[row].every(cell => cell === this.currentPlayer)) {
      this.winner = this.currentPlayer;
      return;
    }

    // Verifica se verticais estao iguais
    if (this.board.every(rowArr => rowArr[col] === this.currentPlayer)) {
      this.winner = this.currentPlayer;
      return;
    }

    // Verifica se as diagonais estao iguais
    if (row === col || row + col === 2) {
      if (this.board[0][0] === this.currentPlayer && this.board[1][1] === this.currentPlayer && this.board[2][2] === this.currentPlayer) {
        this.winner = this.currentPlayer;
        return;
      }
      if (this.board[0][2] === this.currentPlayer && this.board[1][1] === this.currentPlayer && this.board[2][0] === this.currentPlayer) {
        this.winner = this.currentPlayer;
        return;
      }
    }
    // Verifique empate (velha)
    let isDraw = true;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (!this.board[i][j]) {
          isDraw = false;
          break;
        }
      }
      if (!isDraw) {
        break;
      }
    }

    if (isDraw) {
      // Empate (velha)
      this.restartGame();
      Swal.fire({
        title: ('Deu velha o jogo terminou em empate.'),
        icon: 'error',
        position: 'center'
      });
    }
  }

  restartGame() {
    this.initializeGame();
  }

}

