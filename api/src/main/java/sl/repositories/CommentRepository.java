package sl.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sl.domains.comment.Comment;

public interface CommentRepository extends JpaRepository<Comment, String> {
}
