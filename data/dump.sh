elasticdump \
  --input=http://localhost:9200/songs \
  --output=songs_analyzer.json \
  --type=analyzer
elasticdump \
  --input=http://localhost:9200/songs \
  --output=songs_mapping.json \
  --type=mapping
elasticdump \
  --input=http://localhost:9200/songs \
  --output=songs.json \
  --type=data
