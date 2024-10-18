package sl.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import sl.config.storage.service.StorageService;
import sl.domains.photo.Photo;
import sl.domains.photo.PhotoRequestDTO;
import sl.services.PhotoService;

import java.util.Set;

import static sl.util.FileUtil.generateFilename;
import static sl.util.FileUtil.validateFileSizeAndContent;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    private final PhotoService photoService;
    private final StorageService storageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> save(@Valid PhotoRequestDTO dto) throws Exception {
        photoService.save(toPhoto(dto));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    private Photo toPhoto(PhotoRequestDTO dto) throws Exception {
        validatePhoto(dto.photo());
        String filename = generateFilename("photos", dto.photo().getOriginalFilename());
        String photoUrl = storageService.uploadFileAndGenerateAccessUrl(dto.photo(), filename);
        return Photo.builder().url(photoUrl).build();
    }

    private void validatePhoto(MultipartFile photo) {
        long limitSize = 1048576;
        Set<String> acceptedTypes = Set.of(MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE);
        validateFileSizeAndContent(photo, limitSize, acceptedTypes);
    }
}
