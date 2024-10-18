package sl.domains.comment;

import sl.domains.user.UserResponseDTO;

import java.time.LocalDateTime;

public record CommentResponseDTO(String id, String content, LocalDateTime createdAt, UserResponseDTO user) {
}
