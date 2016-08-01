package net.kalmas.cruzers.repo;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import net.kalmas.cruzers.model.Song;

public interface SongRepo extends ElasticsearchRepository<Song, String>
{
}
