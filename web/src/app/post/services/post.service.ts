import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPostResponseDTO} from "../models/IPostResponseDTO";
import {IPostRequestDTO} from "../models/IPostRequestDTO";
import {LocalStorageUtils} from "../../util/local-storage";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly URL: string = 'http://localhost:8080/api/posts'

  constructor(private http: HttpClient) {
  }

  save(post: IPostRequestDTO) {
    const headers = new HttpHeaders({'Authorization': `Bearer ${LocalStorageUtils.getUserToken()}`});
    return this.http.post(this.URL, post, {headers})
  }

  findAll(): Observable<IPostResponseDTO[]> {
    return this.http.get<IPostResponseDTO[]>(this.URL)
  }

  findById(postId: string): Observable<IPostResponseDTO> {
    return this.http.get<IPostResponseDTO>(`${this.URL}/${postId}`)
  }

  deleteById(postId: string) {
    const headers = new HttpHeaders({'Authorization': `Bearer ${LocalStorageUtils.getUserToken()}`});
    return this.http.delete(`${this.URL}/${postId}`, {headers})
  }

}
