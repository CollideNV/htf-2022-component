import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { SpellService } from './spell.service';

@Component({
  selector: 'htf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeSpell?: string;
  answer?: string;
  private _quest: any;

  @Input() set url(value: string) {
    this.spellService.url = value;
  }
  get url() {
    return this.spellService.url;
  }

  @Input() set quest(value: any) {
    if (typeof value == "string") this._quest = JSON.parse(value);
    else this._quest = value;
  }
  get quest() {
    return this._quest;
  }

  constructor(private spellService: SpellService) {}

  activate(id: string) {
    this.answer = '';
    this.activeSpell = id;
  }

  async castSpell(spell: any) {
    try {
      const response = await firstValueFrom(
        this.spellService.castSpell(spell, this.answer || '')
      );
      if (response.effective) spell.name = response.name;
    } catch(e) {
      console.error(e);
    }
  }
}
