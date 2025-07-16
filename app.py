
# from flask import Flask, render_template, request, redirect, url_for, jsonify
# from flask_mail import Mail, Message
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
# import os
# app = Flask(__name__)
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Use Gmail SMTP or other provider
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = 'mathivarmaganesan@gmail.com'    
# app.config['MAIL_PASSWORD'] = 'ryib qgbq lktw iwhf'            
# app.config['MAIL_DEFAULT_SENDER'] = 'devakimathivarma@gmail.com'

# mail = Mail(app)
# basedir = os.path.abspath(os.path.dirname(__file__))
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'bookings.db')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# # ── Booking model ──────────────────────────────────────────────
# class Booking(db.Model):
#     id        = db.Column(db.Integer, primary_key=True)
#     fname     = db.Column(db.String(80))
#     lname     = db.Column(db.String(80))
#     email     = db.Column(db.String(120))
#     phone     = db.Column(db.String(40))
#     date      = db.Column(db.String(20))
#     time      = db.Column(db.String(20))
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)

# @app.route("/")
# def home():
#     return render_template("index.html")

# @app.route("/about")
# def about():
#     return render_template("About-Us.html")

# @app.route("/bms")
# def bms():
#     return render_template("Bms.html")

# @app.route("/cctv")
# def cctv():
#     return render_template("cctv.html")

# @app.route("/electrical")
# def electrical():
#     return render_template("electrical.html")

# @app.route("/projects")
# def projects():
#     return render_template("projects.html")

# @app.route("/get-quote")
# def get_quote():
#     return render_template("get_quote.html")

# @app.route('/submit_form', methods=['POST'])
# def submit_form():
#     data = request.form
#     booking = Booking(
#         fname=data.get('fname'),
#         lname=data.get('lname'),
#         email=data.get('email'),
#         phone=data.get('phone'),
#         date=data.get('date'),
#         time=data.get('time')
#     )
#     db.session.add(booking)
#     db.session.commit()
#     msg = Message("Thank you,Received your Quotes. Will contact you",
#                   recipients=[data.get('email')])

#     msg.html = f"""
# <!DOCTYPE html>
# <html>
#   <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px; color: #333;">
#     <div style="max-width: 600px; background: #ffffff; margin: auto; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
#       <h2 style="color: #2f4ea1; text-align: center;">😊 Thank You for Reaching Out! 😊</h2>
#       <p>Dear <strong>{data.get('fname')} {data.get('lname')}</strong>,</p>

#       <p>We’ve received your inquiry and are thrilled to assist you! ✨</p>

#       <p>Here’s a quick summary of the details you submitted:</p>
#       <ul style="line-height: 1.8;">
#         <li><strong>Email:</strong> {data.get('email')}</li>
#         <li><strong>Phone:</strong> {data.get('phone')}</li>
#         <li><strong>Preferred Date:</strong> {data.get('date')}</li>
#         <li><strong>Preferred Time:</strong> {data.get('time')}</li>
#       </ul>

#       <p>Our team will get back to you shortly with more details. 🛠️</p>

#       <p style="margin-top: 30px;">Thank you again for your time and trust in <strong>ZAHIRX</strong>. 💡</p>

#       <p style="margin-top: 20px;">
#         Warm regards,<br>
#         <strong>Team ZAHIRX</strong><br>
#       </p>
#     </div>
#   </body>
# </html>
# """


#     try:
#         print(msg);
#         mail.send(msg)
#         return jsonify({"status": "success"})
#     except Exception as e:
#         print("Mail error:", e)
#         return jsonify({"status": "error"}), 500

# if __name__ == "__main__":
#     with app.app_context():
#         db.create_all()          # creates bookings.db (once)
#     app.run(debug=True)

from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from datetime import datetime
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# ── Mail Config ─────────────────────────
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'mathivarmaganesan@gmail.com'
app.config['MAIL_PASSWORD'] = 'ryib qgbq lktw iwhf'
app.config['MAIL_DEFAULT_SENDER'] = 'devakimathivarma@gmail.com'
mail = Mail(app)

# ── Upload and DB Config ─────────────────
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'bookings.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max
db = SQLAlchemy(app)

# ── Booking Model ────────────────────────
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(80))
    lname = db.Column(db.String(80))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(40))
    date = db.Column(db.String(20))
    time = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ── Career Application Model ─────────────
class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    resume = db.Column(db.String(200))
    additional_info = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ── Pages ────────────────────────────────
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

@app.route("/career")
def career():
    return render_template("career.html")

@app.route("/privacy-policy")
def privacy_policy():
    return render_template("privacy.html")

# ── Booking Form ─────────────────────────
@app.route('/submit_form', methods=['POST'])
def submit_form():
    data = request.form
    booking = Booking(
        fname=data.get('fname'),
        lname=data.get('lname'),
        email=data.get('email'),
        phone=data.get('phone'),
        date=data.get('date'),
        time=data.get('time')
    )
    db.session.add(booking)
    db.session.commit()

    msg = Message("Thank you, Received your Quotes. Will contact you",
                  recipients=[data.get('email')])
    msg.html = f"""
    <!DOCTYPE html>
    <html><body style="font-family: Arial; background: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; background: #ffffff; margin: auto; padding: 40px; border-radius: 10px;">
      <h2 style="color: #2f4ea1;">😊 Thank You for Reaching Out!</h2>
      <p>Dear <strong>{data.get('fname')} {data.get('lname')}</strong>,</p>
      <p>We’ve received your inquiry and are thrilled to assist you!</p>
      <ul>
        <li><strong>Email:</strong> {data.get('email')}</li>
        <li><strong>Phone:</strong> {data.get('phone')}</li>
        <li><strong>Preferred Date:</strong> {data.get('date')}</li>
        <li><strong>Preferred Time:</strong> {data.get('time')}</li>
      </ul>
      <p>Thank you again for your time and trust in <strong>ZAHIRX</strong>.</p>
    </div></body></html>
    """
    try:
        mail.send(msg)
        return jsonify({"status": "success"})
    except Exception as e:
        print("Mail error:", e)
        return jsonify({"status": "error"}), 500

# ── Career Form Submission ────────────────
@app.route('/submit_career', methods=['POST'])
def submit_career():
    full_name = request.form['full_name']
    email = request.form['email']
    phone = request.form['phone']
    additional_info = request.form.get('additional_info', '')
    resume_file = request.files['resume']

    if resume_file and resume_file.filename.endswith('.pdf'):
        filename = secure_filename(resume_file.filename)
        resume_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        resume_file.save(resume_path)

        application = Application(
            full_name=full_name,
            email=email,
            phone=phone,
            additional_info=additional_info,
            resume=filename
        )
        db.session.add(application)
        db.session.commit()

        return jsonify({"status": "success"})  # ✅ Success response
    else:
        return jsonify({'error': 'Only PDF files allowed'}), 400  # ❌ Error for non-pdf

@app.route('/terms')
def terms():
    return render_template('terms.html')
# ── Start Server ──────────────────────────
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
