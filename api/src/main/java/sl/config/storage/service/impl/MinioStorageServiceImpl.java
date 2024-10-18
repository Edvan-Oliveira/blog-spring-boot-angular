package sl.config.storage.service.impl;

import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.http.Method;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sl.config.AppApplicationProperties;
import sl.config.storage.service.StorageService;

import java.io.InputStream;

@Service
public class MinioStorageServiceImpl implements StorageService {

    private final String appBucket;
    private final MinioClient minioClient;

    public MinioStorageServiceImpl(AppApplicationProperties properties, MinioClient minioClient) {
        this.appBucket = properties.getMinio().getAppBucket();
        this.minioClient = minioClient;
    }

    @Override
    public void deleteFile(String objectName) throws Exception {
        minioClient.removeObject(
                RemoveObjectArgs.builder()
                        .bucket(appBucket)
                        .object(objectName)
                        .build());
    }

    @Override
    public String uploadFileAndGenerateAccessUrl(MultipartFile file, String objectName) throws Exception {
        uploadFile(file, objectName);
        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .method(Method.GET)
                        .bucket(appBucket)
                        .object(objectName)
                        .build());
    }

    private void uploadFile(MultipartFile file, String objectName) throws Exception {
        InputStream inputStream = file.getInputStream();
        minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(appBucket)
                        .object(objectName)
                        .stream(inputStream, inputStream.available(), -1)
                        .contentType(file.getContentType())
                        .build());
    }
}
