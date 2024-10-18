CREATE TABLE IF NOT EXISTS public.comment (
    id CHAR(36) PRIMARY KEY,
    content VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE,
    user_id CHAR(36) NOT NULL,
    post_id CHAR(36) NOT NULL
);

ALTER TABLE public.comment
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES public.user (id)
ON UPDATE CASCADE;

ALTER TABLE public.comment
ADD CONSTRAINT fk_post
FOREIGN KEY (post_id) REFERENCES public.post (id)
ON UPDATE CASCADE;