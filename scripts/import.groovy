#!/usr/bin/env groovy

/**
 * Reads CSV file, makes json objects, inserts them in to elastic index.
 */

@Grab('org.apache.commons:commons-csv:1.2')
@Grab(group='org.codehaus.groovy.modules.http-builder', module='http-builder', version='0.6')

import org.apache.commons.csv.CSVParser
import static org.apache.commons.csv.CSVFormat.*

import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.JSON
import static groovyx.net.http.Method.POST

import java.nio.file.Paths
import groovy.json.*

class Song {
    String code, title, artist
}

def http = new HTTPBuilder( 'http://localhost:9200/songs2/song' )

Paths.get('songbook/cleaned.csv').withReader { reader ->
    CSVParser csv = new CSVParser(reader, DEFAULT.withHeader())

    csv.iterator().each { record ->
        code = record.code.trim()
        title = record.title.trim()
        artist = null
        try {
            artist = record.artist.trim()
            if(artist.size() == 0) {
                artist = null
            }
        }
        catch(Exception e) {}

        
        http.request( POST, JSON ) { req ->
            body = [code:code, title:title, artist:artist]

            response.success = { resp, json ->
                println resp.dump()
            }
        }
    } 
}
