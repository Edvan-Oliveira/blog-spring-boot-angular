package sl.config.storage.service.impl;

import io.minio.*;
import io.minio.http.Method;
import io.minio.messages.DeleteError;
import io.minio.messages.DeleteObject;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sl.config.AppApplicationProperties;
import sl.config.storage.service.StorageService;

import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

@Log4j2
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
    public void deleteFiles(List<String> objectNames) throws Exception {
        List<DeleteObject> listOfObject = objectNames.stream().map(DeleteObject::new).toList();
        Iterable<Result<DeleteError>> results = minioClient.removeObjects(RemoveObjectsArgs.builder()
                .bucket(appBucket)
                .objects(listOfObject)
                .build());

        for (Result<DeleteError> result : results) {
            DeleteError error = result.get();
            log.error("Error in deleting object {}; {}", error.objectName(), error.message());
        }
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
