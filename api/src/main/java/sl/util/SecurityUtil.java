package sl.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import sl.domains.user.User;

public final class SecurityUtil {

    public static User getAuthenticatedUser() {
        Authentication autenticacao = SecurityContextHolder.getContext().getAuthentication();
        if (autenticacao == null) return null;
        return (User) autenticacao.getPrincipal();
    }

    public static String getAuthenticatedUserId() {
        User user = getAuthenticatedUser();
        return user != null ? user.getId() : null;
    }
}
