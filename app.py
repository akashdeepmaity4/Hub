from flask import Flask, render_template, request, redirect, url_for, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route('/assets/<path:filename>')
def serve_asset(filename):
    return send_from_directory(os.path.join(app.root_path, 'assets'), filename)








if __name__ == '__main__':
    app.run(debug=True)