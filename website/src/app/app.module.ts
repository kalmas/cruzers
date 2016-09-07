import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SongComponent } from './song/song.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        SongComponent
    ],
    providers: [ APP_ROUTER_PROVIDERS ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
