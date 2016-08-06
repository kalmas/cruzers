elasticdump \
  --output=http://localhost:9200/songs \
  --input=songs_analyzer.json \
  --type=analyzer
elasticdump \
  --output=http://localhost:9200/songs \
  --input=songs_mapping.json \
  --type=mapping
elasticdump \
  --output=http://localhost:9200/songs \
  --input=songs.json \
  --type=data
