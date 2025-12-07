import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Disc } from '../interface/disc.interface';

interface ITunesAlbum {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  releaseDate: string;
}

interface ITunesResponse {
  resultCount: number;
  results: ITunesAlbum[];
}

@Injectable({ providedIn: 'root' })
export class MusicService {
  private readonly apiUrl = 'https://itunes.apple.com/search';

  constructor(private http: HttpClient) {}

  searchDiscs(term: string): Observable<Disc[]> {
    const params = new HttpParams()
      .set('term', term)
      .set('entity', 'album')
      .set('limit', 20);

    return this.http.get<ITunesResponse>(this.apiUrl, { params }).pipe(
      map(res =>
        res.results.map(album => ({
          id: album.collectionId,
          title: album.collectionName,
          artist: album.artistName,
          coverUrl: album.artworkUrl100,
          releaseYear: album.releaseDate?.substring(0, 4)
        }) as Disc)
      )
    );
  }
}
