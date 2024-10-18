package sl.domains.comment;

import jakarta.validation.constraints.NotNull;
import sl.domains.post.Post;

public record CommentRequestDTO(@NotNull String content, @NotNull Post post) {
}
