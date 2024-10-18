import {IPhotoResponseDTO} from "./IPhotoResponseDTO";
import {IUserResponseDTO} from "../../post/models/IUserResponseDTO";

export interface IAlbumResponseDTO {
  id: string;
  title: string;
  createdAt: Date;
  photos: IPhotoResponseDTO[];
  user: IUserResponseDTO;
}
