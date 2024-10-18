import {IUserResponseDTO} from "./IUserResponseDTO";
import {ICommentResponseDTO} from "./ICommentResponseDTO";

export interface IPostResponseDTO {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  user: IUserResponseDTO;
  comments: ICommentResponseDTO[];
}
