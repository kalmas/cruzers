import { provideRouter, RouterConfig } from '@angular/router';

import { AboutComponent }  from './about/about.component';
import { HomeComponent }  from './home/home.component';
import { SongComponent }  from './song/song.component';

// Route Configuration
export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'songs/:id', component: SongComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];