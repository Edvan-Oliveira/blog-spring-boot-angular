export interface ICommentRequestDTO {
  content: string;
  post: ICommentPostRequestDTO;
}

export interface ICommentPostRequestDTO {
  id: string;
}
