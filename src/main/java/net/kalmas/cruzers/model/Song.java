package net.kalmas.cruzers.model;

import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "songs", type = "song")
public class Song
{
    private String artist;
    private String code;
    private String id;
    private String title;

    public String getArtist() {
        return this.artist;
    }

    public String getCode() {
        return this.code;
    }

    public String getTitle() {
        return this.title;
    }

    public void setArtist(final String artist) {
        this.artist = artist;
    }

    public void setCode(final String code) {
        this.code = code;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
