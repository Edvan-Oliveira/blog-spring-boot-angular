import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageUtils} from "../../util/local-storage";
import {ICommentRequestDTO} from "../models/ICommentRequestDTO";
import {ICommentResponseDTO} from "../models/ICommentResponseDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly URL: string = 'http://localhost:8080/api/comments'

  constructor(private http: HttpClient) {
  }

  save(comment: ICommentRequestDTO): Observable<ICommentResponseDTO> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${LocalStorageUtils.getUserToken()}`});
    return this.http.post<ICommentResponseDTO>(this.URL, comment, {headers})
  }
}
