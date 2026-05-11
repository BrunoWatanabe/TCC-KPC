from keyphrase_curation.model.keyphrase import KeyphraseEmbeddings

topic = input('topic: ')

ke = KeyphraseEmbeddings(topic, generate_embeddings=True)
print('embeddings generated and serialized at: ',
      f"{ke.embeddings_path}/{topic}.pkl")
print('number of embedding generated:', len(ke.embeddings))
print('embedding for keyphrase 1:', ke.embeddings[1])
