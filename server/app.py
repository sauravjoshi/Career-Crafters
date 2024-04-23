import json
from flask import Flask, request, jsonify
from gensim.models import Word2Vec
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import nltk
import spacy
from pyresparser import ResumeParser
import os
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Load necessary NLTK resources
nltk.download('words')
nltk.download('stopwords')
spacy.cli.download("en_core_web_sm")
nlp = spacy.load("en_core_web_sm")

w2v_model = Word2Vec.load("./model_vectors/word2vec.model")

df_master = pd.read_csv("../data/text_processed.csv")

columns_needed = [
    'city', 'company', 'job level', 'job_skills', 'job_summary', 'job_link', 
    'job_location', 'job_title', 'job_type', 'token_number_after_lem'
]

df_master = df_master[columns_needed]
job_vecs = np.load("./model_vectors/job_vecs.npy")


knn = NearestNeighbors(n_neighbors=10, metric='cosine', algorithm='brute')
knn.fit(job_vecs)

def document_vector(doc):
    doc = [word for word in doc.split() if word in w2v_model.wv.key_to_index]
    return np.mean(w2v_model.wv[doc], axis=0) if doc else np.zeros((w2v_model.vector_size,))

@app.route('/recommend', methods=['POST'])
def recommend_jobs():
    if 'resume' not in request.files:
        return jsonify({'error': 'No resume file provided'}), 400

    file = request.files['resume']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and file.filename.endswith('.pdf'):
        save_path = os.path.join('/tmp', file.filename)
        file.save(save_path)
        data = ResumeParser(save_path).get_extracted_data()
        os.remove(save_path)  # Clean up the file after parsing
        resume_text = json.dumps(data)
        resume_vec = document_vector(resume_text).reshape(1, -1)
        
        distances, indices = knn.kneighbors(resume_vec)
        job_indices = indices.flatten().tolist()
        recommendations = df_master.iloc[job_indices].to_dict(orient='records')
        for recommendation, distance in zip(recommendations, distances.flatten().tolist()):
            recommendation['Match Distance'] = distance
        
        return jsonify(recommendations)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
