import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div id="content" class="section no-pad-bot">
      <div class="container center-align">
          <div class="title">About</div>
      </div>
    </div>
  `,
  directives: [ ROUTER_DIRECTIVES ]
})
export class AboutComponent {
}
