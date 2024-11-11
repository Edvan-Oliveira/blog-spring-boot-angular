import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAlbumResponseDTO} from "../models/IAlbumResponseDTO";
import {LocalStorageUtils} from "../../util/local-storage";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private readonly URL: string = 'http://localhost:8080/api/albums'

  constructor(private http: HttpClient) {
  }

  save(album: FormData) {
    const headers = new HttpHeaders({'Authorization': `Bearer ${LocalStorageUtils.getUserToken()}`});
    return this.http.post(this.URL, album, {headers})
  }

  findAll(): Observable<IAlbumResponseDTO[]> {
    return this.http.get<IAlbumResponseDTO[]>(this.URL)
  }

  findById(albumId: string): Observable<IAlbumResponseDTO> {
    return this.http.get<IAlbumResponseDTO>(`${this.URL}/${albumId}`)
  }

  deleteById(albumId: string) {
    const headers = new HttpHeaders({'Authorization': `Bearer ${LocalStorageUtils.getUserToken()}`});
    return this.http.delete(`${this.URL}/${albumId}`, {headers})
  }

}
