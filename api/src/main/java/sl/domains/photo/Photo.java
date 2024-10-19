package sl.domains.photo;

import jakarta.persistence.*;
import lombok.*;
import sl.domains.album.Album;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "photo", schema = "public")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String url;
    private String uri;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;
}
