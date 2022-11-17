import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpellService {
  url: string = '';
  bewireUrl: string = 'https://htf.bewire.org';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  solveChallenge(spell: any) {
    return this.httpClient.post(
      this.url + '/' + spell.type,
      { ingredients: spell.ingredients },
      { responseType: 'text', headers: this.headers }
    );
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
