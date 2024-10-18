package sl.services;

import sl.domains.comment.Comment;

public interface CommentService {

    Comment save(Comment comment);

    void deleteById(String commentId);

}
