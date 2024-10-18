import {IUserResponseDTO} from "./IUserResponseDTO";

export interface ICommentResponseDTO {
  id: string;
  content: string;
  createdAt: Date;
  user: IUserResponseDTO;
}
