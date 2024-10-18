package sl.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sl.config.storage.service.StorageService;
import sl.domains.album.Album;
import sl.domains.album.AlbumRequestDTO;
import sl.domains.album.AlbumResponseDTO;
import sl.domains.photo.Photo;
import sl.domains.photo.PhotoResponseDTO;
import sl.domains.user.User;
import sl.domains.user.UserResponseDTO;
import sl.services.AlbumService;

import java.util.List;
import java.util.Set;

import static sl.util.FileUtil.generateFilename;
import static sl.util.FileUtil.validateFileSizeAndContent;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    private final AlbumService albumService;
    private final StorageService storageService;

    @GetMapping
    public ResponseEntity<List<AlbumResponseDTO>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(albumService.findAll().stream().map(this::toAlbumDTO).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlbumResponseDTO> findById(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(toAlbumDTO(albumService.findById(id)));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> save(@Valid AlbumRequestDTO dto) {
        albumService.save(toAlbum(dto));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        albumService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private AlbumResponseDTO toAlbumDTO(Album album) {
        return new AlbumResponseDTO(album.getId(), album.getTitle(), album.getCreatedAt(), toPhotoDTO(album.getPhotos()), toUserDTO(album.getUser()));
    }

    private Album toAlbum(AlbumRequestDTO dto) {
        return Album.builder().title(dto.title()).photos(validateAndConvertPhotos(dto.photos())).build();
    }

    private UserResponseDTO toUserDTO(User user) {
        return new UserResponseDTO(user.getId(), user.getName());
    }

    private List<PhotoResponseDTO> toPhotoDTO(List<Photo> photos) {
        return photos.stream().map(this::toPhotoDTO).toList();
    }

    private PhotoResponseDTO toPhotoDTO(Photo photo) {
        return new PhotoResponseDTO(photo.getId(), photo.getUrl());
    }

    private List<Photo> validateAndConvertPhotos(List<MultipartFile> photos) {
        return photos.stream().map(this::validateMultipartFile).toList();
    }

    private Photo validateMultipartFile(MultipartFile photo) {
        validatePhoto(photo);
        String filename = generateFilename("photos", photo.getOriginalFilename());
        String photoUrl = null;
        try {
            photoUrl = storageService.uploadFileAndGenerateAccessUrl(photo, filename);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return Photo.builder().url(photoUrl).build();
    }

    private void validatePhoto(MultipartFile photo) {
        long limitSize = 1048576;
        Set<String> acceptedTypes = Set.of(MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE);
        validateFileSizeAndContent(photo, limitSize, acceptedTypes);
    }
}
