package sl.domains.photo;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record PhotoRequestDTO(@NotNull MultipartFile photo) {
}
