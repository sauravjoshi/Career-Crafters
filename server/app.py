import json
import os
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from pyresparser import ResumeParser
from sklearn.decomposition import PCA
from flask_cors import CORS
from sklearn.neighbors import NearestNeighbors
from gensim.models import Word2Vec
from collections import Counter  # To count skill frequencies

app = Flask(__name__)
CORS(app)

# Load data and models
w2v_model = Word2Vec.load("./model_vectors/word2vec.model")
df_master = pd.read_csv("../data/text_processed.csv")
columns_needed = [
    'city', 'company', 'job level', 'job_skills', 'job_summary', 'job_link', 
    'job_location', 'job_title', 'job_type', 'token_number_after_lem'
]
df_master = df_master[columns_needed]
job_vecs = np.load("./model_vectors/job_vecs.npy")

# Initialize KNN
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
        # Process the resume
        save_path = os.path.join('/tmp', file.filename)
        file.save(save_path)
        data = ResumeParser(save_path).get_extracted_data()
        os.remove(save_path)

        resume_text = json.dumps(data)
        resume_vec = document_vector(resume_text).reshape(1, -1)

        distances, indices = knn.kneighbors(resume_vec)
        recommended_indices = indices.flatten()
        recommended_job_vecs = job_vecs[recommended_indices]

        # Compute top skills for recommended jobs
        skills_counter = Counter()  # To count skill frequencies
        for skills in df_master.iloc[recommended_indices]['job_skills']:
            if skills:
                skills_list = [skill.strip() for skill in skills.split(',')]
                skills_counter.update(skills_list)

        # Get top 5 most common skills and their frequencies
        top_skills = skills_counter.most_common(5)

        # PCA and other data manipulations
        total_jobs = len(job_vecs)
        all_indices = set(range(total_jobs))
        non_recommended_indices = list(all_indices - set(recommended_indices))
        sampled_non_recommended_indices = np.random.choice(non_recommended_indices, 50, replace=False)
        sampled_non_recommended_vecs = job_vecs[sampled_non_recommended_indices]

        all_vectors = np.vstack([resume_vec, recommended_job_vecs, sampled_non_recommended_vecs])
        pca = PCA(n_components=3)
        reduced_vectors = pca.fit_transform(all_vectors)

        df_reduced = pd.DataFrame(reduced_vectors, columns=['Component 1', 'Component 2', 'Component 3'])
        df_reduced['Type'] = ['Resume'] + ['Recommended Job'] * len(recommended_job_vecs) + ['Non-Recommended Job'] * len(sampled_non_recommended_vecs)

        all_jobs = np.concatenate((recommended_indices, sampled_non_recommended_indices))
        job_details = df_master.iloc[all_jobs].reset_index(drop=True)

        # Adding 'Match Distance' for the recommended jobs
        recommended_details = df_master.iloc[recommended_indices].reset_index(drop=True)
        recommended_details['Match Distance'] = distances.flatten()

        df_reduced['Job Title'] = ['Resume'] + [job['job_title'] for job in job_details.to_dict(orient='records')]

        return jsonify({
            'reduced_vectors': df_reduced.to_dict(orient='records'),
            'job_details': recommended_details.to_dict(orient='records'),
            'top_skills': [{"skill": skill, "frequency": freq} for skill, freq in top_skills]  # Top skills with frequencies
        })
