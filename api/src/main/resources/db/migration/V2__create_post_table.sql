CREATE TABLE IF NOT EXISTS public.post (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE,
    user_id CHAR(36) NOT NULL
);

ALTER TABLE public.post
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES public.user (id)
ON UPDATE CASCADE;