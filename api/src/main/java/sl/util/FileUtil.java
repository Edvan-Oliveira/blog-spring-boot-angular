package sl.util;

import org.springframework.web.multipart.MultipartFile;
import sl.exception.BusinessException;

import java.util.Set;
import java.util.UUID;

public class FileUtil {

    public static void validateFileSizeAndContent(MultipartFile file, long limitSize, Set<String> acceptedTypes) {
        validateFileSize(file.getSize(), limitSize);
        validateContentType(file.getContentType(), acceptedTypes);
    }

    public static void validateFileSize(long fileSize, long limitSize) {
        if (fileSize > limitSize) {
            float sizeInMB = (float) limitSize / (1024 * 1024);
            throw new BusinessException("File size must be greater than or equal to" + sizeInMB + " MB");
        }
    }

    public static void validateContentType(String fileContentType, Set<String> acceptedTypes) {
        boolean invalid = acceptedTypes.stream().noneMatch(type -> type.equals(fileContentType));
        if (invalid) throw new BusinessException("File type must be PNG or JPEG");
    }

    public static String getExtension(String originalFilename) {
        if (originalFilename != null) {
            int lastDotIndex = originalFilename.lastIndexOf('.');
            if (lastDotIndex > 0) {
                return originalFilename.substring(lastDotIndex + 1).toLowerCase();
            }
        }
        return "";
    }

    public static String generateFilename(String path, String originalFilename) {
        return String.format("%s/%s.%s", path, UUID.randomUUID(), getExtension(originalFilename));
    }
}
