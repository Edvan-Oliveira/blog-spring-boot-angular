package sl.domains.post;

import sl.domains.comment.CommentResponseDTO;
import sl.domains.user.UserResponseDTO;

import java.time.LocalDateTime;
import java.util.List;

public record PostResponseDTO(String id, String title, String content, LocalDateTime createdAt, UserResponseDTO user, List<CommentResponseDTO> comments) {
}
