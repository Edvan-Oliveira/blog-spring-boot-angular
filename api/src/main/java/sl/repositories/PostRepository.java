package sl.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sl.domains.post.Post;

public interface PostRepository extends JpaRepository<Post, String> {
}
