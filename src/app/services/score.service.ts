import { Injectable } from '@angular/core';

export enum Player {
  X = 'X',
  O = 'O',
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  player1Score: number = 0;
  player2Score: number = 0;

  constructor() { }

  updateScore(winner: Player) {
    if (winner === Player.X) {
      this.player1Score++;
    } else if (winner === Player.O) {
      this.player2Score++;
    }
  }

}
