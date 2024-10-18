package sl.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sl.domains.album.Album;
import sl.exception.BusinessException;
import sl.repositories.AlbumRepository;
import sl.services.AlbumService;

import java.time.LocalDateTime;
import java.util.List;

import static sl.util.SecurityUtil.getAuthenticatedUser;
import static sl.util.SecurityUtil.getAuthenticatedUserId;

@RequiredArgsConstructor
@Service
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;

    @Override
    public List<Album> findAll() {
        return albumRepository.findAll();
    }

    @Override
    public Album findById(String albumId) {
        return albumRepository.findById(albumId)
                .orElseThrow(() -> new BusinessException("Album não encontrada."));
    }

    @Override
    public void save(Album album) {
        album.setUser(getAuthenticatedUser());
        album.setCreatedAt(LocalDateTime.now());
        album.getPhotos().forEach(photo -> photo.setAlbum(album));
        albumRepository.save(album);
    }

    @Override
    public void deleteById(String albumId) {
        Album album = findById(albumId);

        String authenticatedUserId = getAuthenticatedUserId();
        if (authenticatedUserId == null || !authenticatedUserId.equals(album.getUser().getId())) {
            throw new BusinessException("Apenas o autor pode excluir o album.");
        }

        albumRepository.deleteById(albumId);
    }
}