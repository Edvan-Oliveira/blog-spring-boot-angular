package sl.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sl.domains.comment.Comment;
import sl.domains.comment.CommentResponseDTO;
import sl.domains.post.Post;
import sl.domains.post.PostRequestDTO;
import sl.domains.post.PostResponseDTO;
import sl.domains.user.User;
import sl.domains.user.UserResponseDTO;
import sl.services.PostService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(postService.findAll().stream().map(this::toPostDTO).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> findById(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(toPostDTO(postService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody @Valid PostRequestDTO dto) {
        postService.save(toPost(dto));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        postService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private PostResponseDTO toPostDTO(Post post) {
        return new PostResponseDTO(post.getId(), post.getTitle(), post.getContent(), post.getCreatedAt(), toUserDTO(post.getUser()), toCommentDTO(post.getComments()));
    }

    private Post toPost(PostRequestDTO dto) {
        return Post.builder().title(dto.title()).content(dto.content()).build();
    }

    private UserResponseDTO toUserDTO(User user) {
        return new UserResponseDTO(user.getId(), user.getName());
    }

    private List<CommentResponseDTO> toCommentDTO(List<Comment> comments) {
        return comments.stream().map(this::toCommentDTO).toList();
    }

    private CommentResponseDTO toCommentDTO(Comment comment) {
        return new CommentResponseDTO(comment.getId(), comment.getContent(), comment.getCreatedAt(), toUserDTO(comment.getUser()));
    }
}
