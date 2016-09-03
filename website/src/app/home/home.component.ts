import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div id="content" (click)="focus(query)" class="section no-pad-bot">
      <div class="container center-align">
          <!-- <img src="http://placehold.it/500x643" id="main-image"> -->
          <img src="../../public/images/cruzers500.png" id="main-image">
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class HomeComponent {
}
