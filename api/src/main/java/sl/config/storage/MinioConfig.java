package sl.config.storage;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sl.config.AppApplicationProperties;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class MinioConfig {

    private final AppApplicationProperties properties;

    @Bean
    public MinioClient minioClient() {
        try {
            AppApplicationProperties.MinioProperties minioproperties = properties.getMinio();

            MinioClient minioClient = MinioClient.builder()
                    .endpoint(minioproperties.getUrl())
                    .credentials(minioproperties.getAccessKey(), minioproperties.getSecretKey())
                    .build();

            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(minioproperties.getAppBucket()).build());

            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(minioproperties.getAppBucket()).build());
            }

            return minioClient;
        } catch (Exception exception) {
            log.error("Error creating MinioClient", exception);
            throw new RuntimeException(exception);
        }
    }

}
