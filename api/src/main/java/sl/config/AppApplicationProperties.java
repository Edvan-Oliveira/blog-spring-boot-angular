package sl.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "app-api", ignoreUnknownFields = false)
public class AppApplicationProperties {

    private MinioProperties minio;
    private SecurityProperties security;

    @Getter
    @Setter
    public static class SecurityProperties {

        private TokenProperties token;

        @Getter
        @Setter
        public static class TokenProperties {
            private String secret;
            private Long expirationHours;
        }

    }

    @Getter
    @Setter
    public static class MinioProperties {
        private String url;
        private String accessKey;
        private String secretKey;
        private String appBucket;
    }
}