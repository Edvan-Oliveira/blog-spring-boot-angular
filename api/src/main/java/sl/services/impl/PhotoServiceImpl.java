package sl.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sl.domains.comment.Comment;
import sl.domains.photo.Photo;
import sl.exception.BusinessException;
import sl.repositories.CommentRepository;
import sl.repositories.PhotoRepository;
import sl.services.CommentService;
import sl.services.PhotoService;

import java.time.LocalDateTime;

import static sl.util.SecurityUtil.getAuthenticatedUser;
import static sl.util.SecurityUtil.getAuthenticatedUserId;

@RequiredArgsConstructor
@Service
public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository photoRepository;

    @Override
    public void save(Photo photo) {
        photoRepository.save(photo);
    }
}
