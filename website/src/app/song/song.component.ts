import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { SongService } from '../song.service';
import { MemoryStorageService } from '../memoryStorage.service';
import { LocalStorageService } from '../localStorage.service';
import { VideoService } from '../video.service';
import { Song } from '../song';

@Component({
  templateUrl: './song.component.html',
  styleUrls: [ './song.component.css' ],
  providers: [ SongService, MemoryStorageService, LocalStorageService, VideoService ],
})
export class SongComponent implements OnInit
{
    public id: string;
    public song: Song;
    public video: any;
    public videoError: boolean;
    public videoUrl: SafeResourceUrl;
    public videoMsg: string;
    public msgs: string[] = [
        'Let\'s find a video for that...',
        'Karaoke Video Roulette™️',
        'Here comes... something...'
    ];

    private sub: Subscription;

    constructor(private route: ActivatedRoute, private router: Router,
            private songService: SongService, private videoService: VideoService,
            private sanitizer: DomSanitizer) {}

    ngOnInit()
    {
        this.videoMsg = this.msgs[Math.floor(Math.random() * this.msgs.length)];

        // Subscribe to route params
        this.sub = this.route.params.switchMap(
            (params: Object) => {
                this.song = this.songService.getById(params['id']);

                let q: string = `${this.song.title} ${this.song.artist} karaoke`;
                return this.videoService.searchVideos(q, 1);
            })
            .subscribe(
                (videos: any[]) => {
                    this.video = videos[0];

                    if (this.video == null) {
                        this.videoError = true;
                    } else {
                        this.videoError = false;
                        let url = `https://www.youtube.com/embed/${this.video.id.videoId}?origin=http://cruzersforever.com`;
                        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                    }

                },
                (err) => this.router.navigateByUrl('/')
            )
    }

    ngOnDestroy()
    {
        this.sub.unsubscribe();
    }
}
