import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { concatMap, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  url: string = '';
  collideUrl: string = 'https://htf.collide.be';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  solveChallenge(tool: any) {
    return this.httpClient.post(
      this.url + '/' + tool.id,
      tool.ingredients,
      { responseType: 'text', headers: this.headers }
    );
  }

  useTool(tool: any, formula: string) {
    let answer = of(formula);
    if (this.url) answer = this.solveChallenge(tool);
    return answer.pipe(
      switchMap((response) => {
        const params = new HttpParams().set('formula', response);
        return this.httpClient.post<{ effective: boolean; name: string }>(
          this.collideUrl + '/use/' + tool.id,
          params
        );
      })
    );
  }
}
