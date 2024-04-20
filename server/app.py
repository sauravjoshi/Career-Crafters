
from flask import Flask, request, jsonify, send_file
import pandas as pd
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
import nltk
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import io
import ssl


app = Flask(__name__)

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Load necessary NLTK resources
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')

def get_wordnet_pos(treebank_tag):
    if treebank_tag.startswith('J'):
        return wordnet.ADJ
    elif treebank_tag.startswith('V'):
        return wordnet.VERB
    elif treebank_tag.startswith('N'):
        return wordnet.NOUN
    elif treebank_tag.startswith('R'):
        return wordnet.ADV
    else:
        return wordnet.NOUN
    

@app.route('/plot/job_type_distribution')
def plot_job_type_distribution():
    df = pd.read_csv('data.csv')  # Load your data
    plt.figure()
    df.groupby('job_type').size().plot(kind='barh')
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

@app.route('/clean_data', methods=['POST'])
def clean_data():
    data = request.json
    df = pd.DataFrame(data)
    df['clean_job_desc'] = df['job_desc'].str.replace(r'\W', ' ')
    return jsonify(df.to_dict(orient='records'))

@app.route('/lemmatize', methods=['POST'])
def lemmatize_data():
    data = request.json
    df = pd.DataFrame(data)
    lemmatizer = WordNetLemmatizer()
    def lemmatize_sentence(text):
        tokens = nltk.word_tokenize(text)
        pos_tags = nltk.pos_tag(tokens)
        tokens = [lemmatizer.lemmatize(t[0], get_wordnet_pos(t[1])) for t in pos_tags]
        return ' '.join(tokens)
    df['job_desc_lem'] = df['clean_job_desc'].apply(lemmatize_sentence)
    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
