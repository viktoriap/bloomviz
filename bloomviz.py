from flask import Flask, jsonify
from flask import render_template
from flask import request
from flask_bootstrap import Bootstrap
from bloomfilter import BloomFilter
from cuckoohashing import CuckooHashing

app = Flask(__name__)
app.config.from_object(__name__)
Bootstrap(app)
bf = BloomFilter(20, 3)
ch = CuckooHashing(20, 20)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/cuckoo')
def cuckoo():
    return render_template('cuckoo.html')


@app.route('/cuckoo/add')
def add_value():
    value = request.args.get('value', 0, type=int)
    response = ch.add(value)
    return jsonify(response_add=response)


@app.route('/cuckoo/find')
def find_value():
    value = request.args.get('find', 0, type=int)
    response = ch.find(value)
    return jsonify(response_find=response)


@app.route('/add')
def bf_add_value():
    value = request.args.get('value', 0, type=str)
    response = bf.add(value)
    return jsonify(response_add=response)


@app.route('/find')
def bf_find_value():
    value = request.args.get('find', 0, type=str)
    response = bf.find(value)
    return jsonify(response_find=response)
