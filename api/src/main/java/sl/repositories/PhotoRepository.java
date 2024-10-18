package sl.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sl.domains.photo.Photo;

public interface PhotoRepository extends JpaRepository<Photo, String> {
}
