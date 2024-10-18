package sl.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sl.domains.album.Album;

public interface AlbumRepository extends JpaRepository<Album, String> {
}
