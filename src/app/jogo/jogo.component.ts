import { PersonagemComponent } from '../personagem/personagem.component';
import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { CharacterService } from '../character.service';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

enum Player {
  X = 'X',
  O = 'O',
}

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})


export class JogoComponent implements OnInit {
  board: Player[][];
  currentPlayer: Player;
  winner: Player | null;
  player1Score = 0;
  player2Score = 0;
  player1Name = '';
  player2Name = '';
  character1: any; // Placeholder for character data
  character2: any; // Placeholder for character data
  privateKey: any;
  publicKey: any;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    this.board = Array(3).fill(null).map(() => Array(3).fill(null));
    this.currentPlayer = Player.X;
    this.winner = null;
  }

  makeMove(row: number, col: number) {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      this.checkWinner(row, col);
      if (this.winner) {
        this.updateScore();
        //this.updateScore.emit(); // Emitir evento de atualização da pontuação
        this.restartGame(); // Chama updateScore() se houver um vencedor
      }
      this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
    }
  }

  checkWinner(row: number, col: number) {
    // Verifique combinações horizontais
    if (this.board[row].every(cell => cell === this.currentPlayer)) {
      this.winner = this.currentPlayer;
      return;
    }

    // Verifique combinações verticais
    if (this.board.every(rowArr => rowArr[col] === this.currentPlayer)) {
      this.winner = this.currentPlayer;
      return;
    }

    // Verifique diagonais
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
      alert('Empate! O jogo terminou em empate.');
    }
  }


  restartGame() {
    this.initializeGame();
  }

  updateScore() {
    if (this.winner === Player.X) {
      this.player1Score++;
    } else if (this.winner === Player.O) {
      this.player2Score++;
    }
  }

  searchCharacter(name: string, playerNumber: number) {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString(); // Calculate hash

    this.characterService.getCharacterByName(name).subscribe((data: any) => {
      if (data.data.results.length > 0) {
        if (playerNumber === 1) {
          this.character1 = data.data.results[0];
        } else {
          this.character2 = data.data.results[0];
        }
      } else {
        // Handle character not found
      }
    });
  }
}

