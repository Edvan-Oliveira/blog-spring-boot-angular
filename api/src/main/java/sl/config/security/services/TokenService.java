package sl.config.security.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import sl.config.AppApplicationProperties;
import sl.domains.user.User;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@RequiredArgsConstructor
@Slf4j
@Service
public class TokenService {

    private final AppApplicationProperties properties;

    public String generateToken(User user) {
        try {
            return JWT.create()
                    .withIssuer("api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(genExpirationDate())
                    .sign(getAlgorithm());
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while generating token", exception);
        }
    }

    public String validationToken(String token) {
        try {
            return JWT.require(getAlgorithm())
                    .withIssuer("api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(properties.getSecurity().getToken().getSecret());
    }

    private Instant genExpirationDate() {
        return LocalDateTime.now()
                .plusHours(properties.getSecurity().getToken().getExpirationHours())
                .toInstant(ZoneOffset.of("-03:00"));
    }
}