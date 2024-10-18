package sl.domains.album;

import sl.domains.photo.PhotoResponseDTO;
import sl.domains.user.UserResponseDTO;

import java.time.LocalDateTime;
import java.util.List;

public record AlbumResponseDTO(String id, String title, LocalDateTime createdAt, List<PhotoResponseDTO> photos, UserResponseDTO user) {
}
