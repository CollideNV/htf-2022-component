import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  url: string = '';
  bewireUrl: string = 'htf.bewire.org';

  constructor(private httpClient: HttpClient) {}

  solveChallenge(spell: any) {
    return this.httpClient.post<string>(this.url + '/' + spell.endpoint, {
      ingredients: spell.ingredients,
    });
  }

  castSpell(spell: any, formula: string) {
    let answer = of(formula);
    if (this.url) answer = this.solveChallenge(spell)
    return answer.pipe(
      switchMap((response) => {
        return this.httpClient.post(
          this.bewireUrl + '/cast/' + spell.id,
          response
        );
      })
    );
  }
}
