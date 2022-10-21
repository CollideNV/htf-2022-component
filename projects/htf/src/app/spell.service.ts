import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpellService {
  url: string = '';
  bewireUrl: string = 'https://htf.bewire.org';

  constructor(private httpClient: HttpClient) {}

  solveChallenge(spell: any) {
    return this.httpClient.post<string>(this.url + '/' + spell.endpoint, {
      ingredients: spell.ingredients,
    });
  }

  castSpell(spell: any, formula: string) {
    let answer = of(formula);
    if (this.url) answer = this.solveChallenge(spell);
    return answer.pipe(
      switchMap((response) => {
        const params = new HttpParams().set('formula', response);
        return this.httpClient.post<{ effective: boolean; name: string }>(
          this.bewireUrl + '/cast/' + spell.id,
          params
        );
      })
    );
  }
}
