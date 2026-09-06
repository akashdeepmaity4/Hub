from flask import Flask, render_template, request, redirect, url_for
from flask import send_from_directory
import os
import subprocess
import sys
import webview

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route('/hubconfig')
@app.route('/hubconfig.html')
def hubconfig():
    return render_template("hubconfig.html")

@app.route('/assets/<path:filename>')
def serve_asset(filename):
    return send_from_directory(os.path.join(app.root_path, 'assets'), filename)





if __name__ == '__main__':
    app.run(debug=True)