import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

import { SpellService } from './spell.service';

describe('SpellService', () => {
  let service: SpellService;
  let httpTestingController: HttpTestingController;
  let spell: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SpellService);
    httpTestingController = TestBed.inject(HttpTestingController);
    spell = {
      id: 'f740a20a-fc11-444b-9ebd-5e60294a1f60',
      name: 'UNKNOWN',
      effect: 'Creates a small, localised thunderstorm within an area.',
      recipe:
        'Is the following number a Disarium Number? (Use N or Y as answer)',
      ingredients: '1676',
      remainingAttempts: '1',
      difficulty: 10,
      solved: null,
      endpoint: 'disarium',
    };
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send request to team api to solve spell challenge', async () => {
    const expected = 'testresponse';
    const response = firstValueFrom(service.solveChallenge(spell));
    const req = httpTestingController.expectOne(
      service.url + '/' + spell.endpoint
    );
    req.flush(expected);
    expect(req.request.method).toEqual('POST');
    expect(await response).toEqual(expected);
  });
});
