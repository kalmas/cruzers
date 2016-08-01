package net.kalmas.cruzers.config;

import java.io.File;
import java.io.IOException;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.node.NodeClient;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.lease.Releasable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.NodeClientFactoryBean;
import org.springframework.data.elasticsearch.client.TransportClientFactoryBean;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories(basePackages = "net.kalmas.cruzers.repo")
@EnableConfigurationProperties(ElasticsearchProperties.class)
public class ElasticsearchConfig implements DisposableBean
{
    /**
     * If running Elasticsearch as embedded node, data files will be written to this path.
     */
    private static final String DATA_DIRECTORY = "build/data";

    @Autowired
    private ApplicationProperties appProperties;

    @Autowired
    private ElasticsearchProperties elasticProperties;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private Releasable releasable;

    private void deleteDirectory(final String path) {
        try {
            FileUtils.deleteDirectory(new File(path));
        } catch (final IOException e) {
            throw new RuntimeException("Could not delete data directory of embedded elasticsearch server", e);
        }
    }

    @Override
    public void destroy()
            throws Exception
    {
        this.log.info("Closing connection to Elasticsearch.");
        this.releasable.close();

        if (this.appProperties.getEmbeddedTestElastic()) {
            this.log.info(String.format("Cleaning data directory at %s.", DATA_DIRECTORY));
            this.deleteDirectory(DATA_DIRECTORY);
        }
    }

    @Bean
    public Client elasticSearchClient()
            throws Exception
    {
        if (this.appProperties.getEmbeddedTestElastic()) {
            this.log.info(String.format("Starting local Elasticsearch instance in %s.", DATA_DIRECTORY));

            final NodeClientFactoryBean factory = new NodeClientFactoryBean(true);
            factory.setPathData(DATA_DIRECTORY);
            factory.setEnableHttp(false);
            factory.setPathHome(".");
            factory.setClusterName("elasticsearch");
            factory.afterPropertiesSet();

            final NodeClient client = factory.getObject();
            this.releasable = client;
            return client;
        } else {
            final String clusterNodes = this.elasticProperties.getClusterNodes();

            this.log.info(String.format("Connecting to remote Elasticsearch instance at %s.", clusterNodes));

            final TransportClientFactoryBean factory = new TransportClientFactoryBean();
            factory.setClusterNodes(clusterNodes);
            factory.setClientIgnoreClusterName(true);
            factory.afterPropertiesSet();

            final TransportClient transportClient = factory.getObject();
            this.releasable = transportClient;
            return transportClient;
        }
    }

    @Bean
    public ElasticsearchOperations elasticsearchTemplate()
            throws Exception
    {
        return new ElasticsearchTemplate(this.elasticSearchClient());
    }
}
