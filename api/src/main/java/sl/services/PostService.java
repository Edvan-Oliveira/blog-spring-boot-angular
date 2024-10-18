package sl.services;

import sl.domains.post.Post;

import java.util.List;

public interface PostService {

    List<Post> findAll();

    Post findById(String postId);

    void save(Post post);

    void deleteById(String postId);

}
