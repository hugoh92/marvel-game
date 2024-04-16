import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JogoComponent, Player } from './jogo.component';

describe('JogoComponent', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JogoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('componente criado', () => {
    expect(component).toBeTruthy();
  });

  it('jogo inicia corretamente', () => {
    component.initializeGame();
    expect(component.board).toEqual([[null, null, null], [null, null, null], [null, null, null]]);
    expect(component.currentPlayer).toBeDefined();
    expect(component.winner).toBeNull();
  });

  it('jogadores alternados corretamente', () => {
    component.currentPlayer = Player.X;
    component.makeMove(0, 0);
    expect(component.currentPlayer).toBe(Player.O);
    component.makeMove(1, 0);
    expect(component.currentPlayer).toBe(Player.X);
  });

});
