CREATE TABLE IF NOT EXISTS public.photo (
    id CHAR(36) PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    album_id CHAR(36) NOT NULL
);

ALTER TABLE public.photo
ADD CONSTRAINT fk_album
FOREIGN KEY (album_id) REFERENCES public.album (id)
ON UPDATE CASCADE;