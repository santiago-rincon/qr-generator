from flask import Flask, request, jsonify
from flask_cors import CORS
from modules.qr_generator import make_qr

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    print(request)
    return "<h1>Hola mundo V1</h1>"


@app.route('/api/qr', methods=['POST'])
def generate_qr():
    body = request.get_json()
    try:
        text = body['text']
        ext = body['ext']
        print(ext)
        if ext != '.svg' and ext != '.png':
            raise Exception('ext_format')
        response_text = make_qr(text, ext)
    except Exception as e:
        e = str(e)
        if e == "'text'":
            return jsonify({'error': 'Field text not found'}), 400
        if e == "'ext'":
            return jsonify({'error': 'Field ext not found'}), 400
        if e == "ext_format":
            return jsonify({'error': 'Extension not supported, only .svg and .png are supported'}), 400
    return jsonify({'base64': response_text}), 200
