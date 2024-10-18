package sl.domains.album;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;
import sl.domains.photo.Photo;

import java.util.List;

public record AlbumRequestDTO(@NotNull String title, @NotEmpty List<MultipartFile> photos) {
}
