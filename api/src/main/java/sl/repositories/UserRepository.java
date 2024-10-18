package sl.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import sl.domains.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<UserDetails> findUserByEmail(String email);

}
