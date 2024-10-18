package sl.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sl.domains.post.Post;
import sl.exception.BusinessException;
import sl.repositories.PostRepository;
import sl.services.PostService;

import java.time.LocalDateTime;
import java.util.List;

import static sl.util.SecurityUtil.getAuthenticatedUser;
import static sl.util.SecurityUtil.getAuthenticatedUserId;

@RequiredArgsConstructor
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public Post findById(String postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new BusinessException("Publicação não encontrada."));
    }

    @Override
    public void save(Post post) {
        post.setUser(getAuthenticatedUser());
        post.setCreatedAt(LocalDateTime.now());
        postRepository.save(post);
    }

    @Override
    public void deleteById(String postId) {
        Post post = findById(postId);

        String authenticatedUserId = getAuthenticatedUserId();
        if (authenticatedUserId == null || !authenticatedUserId.equals(post.getUser().getId())) {
            throw new BusinessException("Apenas o autor pode excluir a publicação.");
        }

        postRepository.deleteById(postId);
    }
}
