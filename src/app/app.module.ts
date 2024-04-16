import { CharacterService } from './services/character.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JogoComponent } from './jogo/jogo.component';
import { PersonagemComponent } from './personagem/personagem.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ScoreService } from './services/score.service';

@NgModule({
  declarations: [
    AppComponent,
    JogoComponent,
    PersonagemComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [
    CharacterService,
    ScoreService // Forneça o GameService
    // Outros serviços...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
