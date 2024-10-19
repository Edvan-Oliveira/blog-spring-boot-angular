package sl.config.storage.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface StorageService {

    void deleteFile(String objectName) throws Exception;

    void deleteFiles(List<String> objectName) throws Exception;

    String uploadFileAndGenerateAccessUrl(MultipartFile file, String objectName) throws Exception;
}
