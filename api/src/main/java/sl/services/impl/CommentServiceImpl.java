package sl.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sl.domains.comment.Comment;
import sl.exception.BusinessException;
import sl.repositories.CommentRepository;
import sl.services.CommentService;

import java.time.LocalDateTime;

import static sl.util.SecurityUtil.getAuthenticatedUser;
import static sl.util.SecurityUtil.getAuthenticatedUserId;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Comment save(Comment comment) {
        comment.setUser(getAuthenticatedUser());
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    @Override
    public void deleteById(String commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessException("Comentário não encontrado."));

        String authenticatedUserId = getAuthenticatedUserId();
        if (authenticatedUserId == null || !authenticatedUserId.equals(comment.getUser().getId())) {
            throw new BusinessException("Apenas o autor pode exluir o comentário.");
        }

        commentRepository.deleteById(commentId);
    }
}
