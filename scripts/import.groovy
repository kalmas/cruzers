#!/usr/bin/env groovy

@Grab('org.apache.commons:commons-csv:1.2')
import org.apache.commons.csv.CSVParser
import static org.apache.commons.csv.CSVFormat.*

import java.nio.file.Paths
import groovy.json.*

class Song {
    String code, title, artist
}

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

        song = ([code: code,
             title: title,
             artist: artist] as Song)

        println new JsonBuilder(song).toPrettyString()
    } 
}


/*
@Grab(group='com.twilio.sdk', module='twilio-java-sdk', version='4.4.4')

import com.twilio.sdk.TwilioRestClient
import org.apache.http.message.BasicNameValuePair
import com.twilio.sdk.resource.instance.IncomingPhoneNumber
import com.twilio.sdk.resource.list.IncomingPhoneNumberList

def buildCsv = { List numbers ->

    def dateFormat = 'MM-dd-yyyy HH:mm z';

    // Header
    def theString = 'Id,Number,SMS Callback URL,Updated,Created\n';

    // Phone number details
    numbers.each {
        theString += it.getSid() + ',' +
            it.getPhoneNumber() + ',' +
            it.getSmsUrl() + ',' +
            it.getDateUpdated().format(dateFormat) + ',' +
            it.getDateCreated().format(dateFormat) + '\n';
    }

    return theString;
}

def buildPrettyTable = { List numbers ->

    def columnWidthId = 36
    def columnWidthNumber = 14
    def columnWidthSmsUrl = 50
    def columnWidthDate = 22
    def dateFormat = 'MM-dd-yyyy HH:mm z'

    // Header
    def theString = '\n' + 'Id'.padRight(columnWidthId) +
        'Number'.padRight(columnWidthNumber) +
        'SMS Callback URL'.padRight(columnWidthSmsUrl) +
        'Updated'.padRight(columnWidthDate)  +
        'Created'.padRight(columnWidthDate) + "\n"
    theString += ''.padRight(columnWidthId + columnWidthNumber + columnWidthSmsUrl + columnWidthDate + columnWidthDate, '-') + '\n'

    // Phone number details
    numbers.each {
        theString += it.getSid().padRight(columnWidthId) +
            it.getPhoneNumber().padRight(columnWidthNumber) +
            it.getSmsUrl().padRight(columnWidthSmsUrl) +
            it.getDateUpdated().format(dateFormat).padRight(columnWidthDate) +
            it.getDateCreated().format(dateFormat).padRight(columnWidthDate) + '\n';
    }

    return theString += "\nTotal: ${numbers.size()} numbers.\n\n"
}



def fetchIncomingNumbers = { TwilioRestClient twilioClient, id ->

    def List numbers = []
    if (id) {
        numbers.add(twilioClient.getAccount().getIncomingPhoneNumber(id))
    } else {
        twilioClient.getAccount().getIncomingPhoneNumbers().iterator().each {
            numbers.add(it)
        }
    }

    return numbers
}

def initCli = {
    def cli = new CliBuilder(usage: 'number-admin.groovy [action]')
    cli.h(longOpt: 'help', 'Show usage information.')
    cli.l(longOpt: 'list', 'List incoming phone numbers in twilio account.')
    cli._(longOpt: 'update-callback', 'Update callback URL for incoming SMS messages. ' +
            '(e.g. number-admin.groovy --update-callback --id PNc4e666a8313064b87f6a26a84c011111 --url https://example.com/incoming)')

    cli._(longOpt: 'id', args:1, required:false, 'Phone number id.')
    cli._(longOpt: 'all', required:false, 'Update all numbers.')
    cli._(longOpt: 'url', args:1, required:false, 'New URL.')
    cli._(longOpt: 'csv', required:false, 'Print in CSV format.')

    return cli
}

def loadProperties = { String fileName ->

    Properties properties = new Properties()
    File propertiesFile = new File(fileName)
    propertiesFile.withInputStream {
        properties.load(it)
    }

    return properties
}


def cli = initCli()
def options = cli.parse(args)

assert options : 'Argument parsing has failed'

if (options.h || args.length == 0) {

    println 'Displaying help.'
    cli.usage()
    return
}

def credentials = loadProperties('twilio.credentials')
def client = new TwilioRestClient(credentials.account, credentials.token)

if (options.l) {

    def List numbers = fetchIncomingNumbers(client, options.id)

    if (options.csv) {
        print buildCsv(numbers)
    } else {
        print buildPrettyTable(numbers)
    }

} else if (options.'update-callback') {

    println 'Updating SMS callback URLs in Twilio.'
    assert options.url : '--url must be provided'
    assert options.id || options.all : '--id or --all must be provided'

    def List numbers = fetchIncomingNumbers(client, options.id)

    numbers.each {
        println 'Updating ' + it.getSid();
        it.update(['SmsUrl' : options.url])
    }
}

println 'Done.'
*/