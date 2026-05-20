import numpy as np
import pandas as pd
import pickle
import ast
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

print("Loading CSV...")
df = pd.read_csv("movies_metadata.csv")
print(f"Loaded {len(df)} movies")

print("Preprocessing...")
df = df.drop_duplicates().reset_index(drop=True)
df = df[['title','overview', 'genres','tagline','vote_average','popularity']]
df = df.dropna(subset=['title'])
df['overview'] = df['overview'].fillna(" ")
df['genres'] = df['genres'].apply(lambda x: " ".join([i['name'] for i in ast.literal_eval(x)]))
df['tagline'] = df['tagline'].fillna(' ')
df['tags'] = df['overview'] + " " + df['genres'] + " " + df['tagline']

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def preprocess_text(text):
    text = str(text).lower()
    text = re.sub(r'[^a-zA-Z\s]', "", text)
    words = text.split()
    words = [word for word in words if word not in stop_words]
    words = [lemmatizer.lemmatize(word) for word in words]
    return " ".join(words)

print("Processing text...")
df['tags'] = df['tags'].apply(preprocess_text)
df = df.reset_index(drop=True)

print("Creating indices...")
indices = pd.Series(df.index, index=df['title']).drop_duplicates()

print("Creating TF-IDF...")
tfidf = TfidfVectorizer(max_features=50000, ngram_range=(1,2), stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['tags'])

print("Saving pickle files...")
pickle.dump(tfidf_matrix, open('tfidf_matrix.pkl','wb'))
pickle.dump(indices, open('indices.pkl','wb'))
df.to_pickle('df.pkl')
pickle.dump(tfidf, open('tfidf.pkl','wb'))

print("Done! Pickle files regenerated.")