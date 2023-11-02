import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ToolService } from './tool.service';

@Component({
  selector: 'htf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeTool?: string;
  answer?: string;
  private _quest: any;

  @Input() set url(value: string) {
    this.toolService.url = value;
  }
  get url() {
    return this.toolService.url;
  }

  @Input() set quest(value: any) {
    if (typeof value == "string") this._quest = JSON.parse(value);
    else this._quest = value;
  }
  get quest() {
    return this._quest;
  }

  constructor(private toolService: ToolService) {}

  activate(id: string) {
    this.answer = '';
    this.activeTool = id;
  }

  async useTool(tool: any) {
    try {
      const response = await firstValueFrom(
        this.toolService.useTool(tool, this.answer || '')
      );
      if (response.effective) tool.name = response.name;
    } catch(e) {
      console.error(e);
    }
  }
}
