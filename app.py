
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("About-Us.html")

@app.route("/bms")
def bms():
    return render_template("Bms.html")

@app.route("/cctv")
def cctv():
    return render_template("cctv.html")

@app.route("/electrical")
def electrical():
    return render_template("electrical.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/get-quote")
def get_quote():
    return render_template("get_quote.html")

if __name__ == "__main__":
    app.run(debug=True)
