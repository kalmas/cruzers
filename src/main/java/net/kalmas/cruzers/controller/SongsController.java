package net.kalmas.cruzers.controller;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.kalmas.cruzers.model.Song;
import net.kalmas.cruzers.repo.SongRepo;

@RestController
@RequestMapping("/songs")
class SongsController
{
    @Autowired
    private SongRepo repository;

    @RequestMapping(value = "/suggest", method = RequestMethod.GET)
    public Page<Song> suggest(@RequestParam(required = true) final String query)
    {
        final BoolQueryBuilder boolQuery = new BoolQueryBuilder();

        boolQuery.should(QueryBuilders.matchQuery("title", query.trim()));
        boolQuery.should(QueryBuilders.matchQuery("artist", query.trim()));
        final Pageable pageable = new PageRequest(0, 10);

        return this.repository.search(boolQuery, pageable);
    }
}
