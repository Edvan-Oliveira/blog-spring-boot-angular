package sl.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sl.domains.comment.Comment;
import sl.domains.comment.CommentRequestDTO;
import sl.domains.comment.CommentResponseDTO;
import sl.domains.user.User;
import sl.domains.user.UserResponseDTO;
import sl.services.CommentService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponseDTO> save(@RequestBody @Valid CommentRequestDTO dto) {
        Comment comment = commentService.save(toComment(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(toCommentDTO(comment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        commentService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private Comment toComment(CommentRequestDTO dto) {
        return Comment.builder().content(dto.content()).post(dto.post()).build();
    }

    private CommentResponseDTO toCommentDTO(Comment comment) {
        return new CommentResponseDTO(comment.getId(), comment.getContent(), comment.getCreatedAt(), toUserDTO(comment.getUser()));
    }

    private UserResponseDTO toUserDTO(User user) {
        return new UserResponseDTO(user.getId(), user.getName());
    }
}
