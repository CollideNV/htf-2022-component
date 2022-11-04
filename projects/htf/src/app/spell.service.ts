import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  url: string = '';

  constructor(private httpClient: HttpClient) {}

  solveChallenge(spell: any) {
    return this.httpClient.post<string>(this.url + '/' + spell.endpoint, {
      ingredients: spell.ingredients,
    });
  }
}
