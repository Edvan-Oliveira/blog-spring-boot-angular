package sl.services;

import sl.domains.album.Album;

import java.util.List;

public interface AlbumService {

    List<Album> findAll();

    Album findById(String albumId);

    void save(Album album);

    void deleteById(String albumId);

}
