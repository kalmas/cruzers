import { provideRoutes, Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AboutComponent }  from './about/about.component';
import { HomeComponent }  from './home/home.component';
import { SongComponent }  from './song/song.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'songs/:id', component: SongComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
