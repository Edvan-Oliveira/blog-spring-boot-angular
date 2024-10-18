package sl.domains.post;

import jakarta.validation.constraints.NotNull;

public record PostRequestDTO(@NotNull String title, @NotNull String content) {
}
