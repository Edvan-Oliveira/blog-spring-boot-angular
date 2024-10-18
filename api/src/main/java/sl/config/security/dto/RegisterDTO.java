package sl.config.security.dto;

import jakarta.validation.constraints.NotNull;

public record RegisterDTO(
        @NotNull String name,
        @NotNull String email,
        @NotNull String password) {
}
