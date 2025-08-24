# from flask import Flask, request, send_from_directory, render_template_string, redirect, url_for
# import socket
# import os
# import qrcode

# app = Flask(__name__)
# SHARE_FOLDER = "shared_files"
# UPLOAD_FOLDER = "uploads"

# # Make sure folders exist
# os.makedirs(SHARE_FOLDER, exist_ok=True)
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # Simple HTML page for file listing and upload
# PAGE_TEMPLATE = '''
# <!DOCTYPE html>
# <html>
# <head>
#     <title>File Share Server</title>
# </head>
# <body>
#     <h2>📂 Available Files to Download</h2>
#     <ul>
#     {% for file in files %}
#         <li><a href="/download/{{ file }}">{{ file }}</a></li>
#     {% endfor %}
#     </ul>

#     <h2>⬆️ Upload a New File</h2>
#     <form method="post" action="/upload" enctype="multipart/form-data">
#         <input type="file" name="file">
#         <input type="submit" value="Upload">
#     </form>
# </body>
# </html>
# '''

# @app.route('/')
# def index():
#     files = os.listdir(SHARE_FOLDER)
#     return render_template_string(PAGE_TEMPLATE, files=files)

# @app.route('/download/<path:filename>')
# def download_file(filename):
#     return send_from_directory(SHARE_FOLDER, filename, as_attachment=True)

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     uploaded_file = request.files['file']
#     if uploaded_file.filename != '':
#         save_path = os.path.join(SHARE_FOLDER, uploaded_file.filename)
#         uploaded_file.save(save_path)
#         return f"✅ Uploaded successfully! Saved as {uploaded_file.filename}<br><a href='/'>Go back</a>"
#     return redirect(url_for('index'))

# def get_ip():
#     s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
#     try:
#         s.connect(("10.255.255.255", 1))
#         IP = s.getsockname()[0]
#     except Exception:
#         IP = "127.0.0.1"
#     finally:
#         s.close()
#     return IP

# def generate_qr(link):
#     qr = qrcode.QRCode()
#     qr.add_data(link)
#     qr.make()
#     img = qr.make_image()
#     img.show()

# if __name__ == "__main__":
#     ip = get_ip()
#     port = 5001

#     print("\n✅ Server is running!")
#     link = f"https://{ip}:{port}" if os.path.exists('cert.pem') and os.path.exists('key.pem') else f"http://{ip}:{port}"
#     print(f"🌐 Open this link on your mobile or PC: {link}")
    
#     # Generate QR Code
#     generate_qr(link)

#     # Decide to run with HTTPS or HTTP
#     if os.path.exists('cert.pem') and os.path.exists('key.pem'):
#         app.run(host='0.0.0.0', port=port, ssl_context=('cert.pem', 'key.pem'))
#     else:
#         app.run(host='0.0.0.0', port=port) 

# =================================================================
# server.py
# from flask import Flask, request, send_from_directory, render_template_string, redirect, url_for, jsonify, abort
# from flask_cors import CORS
# import socket
# import os
# import qrcode

# app = Flask(__name__)
# CORS(app)  # allow all origins in dev; restrict in production

# SHARE_FOLDER = "shared_files"
# UPLOAD_FOLDER = "uploads"

# # Make sure folders exist
# os.makedirs(SHARE_FOLDER, exist_ok=True)
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# PAGE_TEMPLATE = '''
# <!DOCTYPE html>
# <html>
# <head>
#     <title>File Share Server</title>
# </head>
# <body>
#     <h2>📂 Available Files to Download</h2>
#     <ul>
#     {% for file in files %}
#         <li><a href="/download/{{ file }}">{{ file }}</a></li>
#     {% endfor %}
#     </ul>

#     <h2>⬆️ Upload a New File</h2>
#     <form method="post" action="/upload" enctype="multipart/form-data">
#         <input type="file" name="file">
#         <input type="submit" value="Upload">
#     </form>
# </body>
# </html>
# '''

# @app.route('/')
# def index():
#     files = os.listdir(SHARE_FOLDER)
#     return render_template_string(PAGE_TEMPLATE, files=files)

# @app.route('/download/<path:filename>')
# def download_file(filename):
#     return send_from_directory(SHARE_FOLDER, filename, as_attachment=True)

# # Keep the HTML upload form, but also return JSON if called via fetch
# @app.route('/upload', methods=['POST'])
# def upload_file():
#     uploaded_file = request.files.get('file')
#     if not uploaded_file or uploaded_file.filename == '':
#         # If fetch expects JSON, return JSON error
#         if request.accept_mimetypes.best == 'application/json' or request.is_json:
#             return jsonify({"error": "No file provided"}), 400
#         return redirect(url_for('index'))

#     save_path = os.path.join(SHARE_FOLDER, uploaded_file.filename)
#     uploaded_file.save(save_path)

#     if request.accept_mimetypes.best == 'application/json' or request.is_json:
#         return jsonify({"message": "Uploaded successfully", "filename": uploaded_file.filename}), 200

#     return f"✅ Uploaded successfully! Saved as {uploaded_file.filename}<br><a href='/'>Go back</a>"

# # JSON API: list files
# @app.route('/api/files', methods=['GET'])
# def api_list_files():
#     files = os.listdir(SHARE_FOLDER)
#     return jsonify({"files": files})

# # JSON API: delete file
# @app.route('/api/delete/<path:filename>', methods=['DELETE'])
# def api_delete(filename):
#     safe_path = os.path.join(SHARE_FOLDER, filename)
#     if not os.path.exists(safe_path):
#         return jsonify({"error": "Not found"}), 404
#     try:
#         os.remove(safe_path)
#         return jsonify({"message": "File deleted"})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# def get_ip():
#     s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
#     try:
#         # doesn't need to be reachable; used to get local outbound IP
#         s.connect(("10.255.255.255", 1))
#         IP = s.getsockname()[0]
#     except Exception:
#         IP = "127.0.0.1"
#     finally:
#         s.close()
#     return IP

# def generate_qr(link):
#     qr = qrcode.QRCode()
#     qr.add_data(link)
#     qr.make()
#     img = qr.make_image()
#     img.show()

# if __name__ == "__main__":
#         app.run(host="127.0.0.1", port=5001, debug=True, ssl_context=None)

#     # ip = get_ip()
#     # port = 5001

#     # print("\n✅ Server is running!")
#     # link = f"https://{ip}:{port}" if os.path.exists('cert.pem') and os.path.exists('key.pem') else f"http://{ip}:{port}"
#     # print(f"🌐 Open this link on your mobile or PC: {link}")

#     # # Generate QR Code for convenience
#     # generate_qr(link)

#     # # Run with HTTPS if you have cert.pem and key.pem (client must trust)
#     # if os.path.exists('cert.pem') and os.path.exists('key.pem'):
#     #     app.run(host='0.0.0.0', port=port, ssl_context=('cert.pem', 'key.pem'))
#     # else:
#     #     app.run(host='0.0.0.0', port=port)


# ==================================================================
from flask import Flask, request, send_from_directory, render_template_string, jsonify
from flask_cors import CORS
import os, qrcode, base64
from io import BytesIO

app = Flask(__name__)

# Allow requests from your deployed frontend
CORS(app, origins=["https://share-hub-mauve.vercel.app"])

SHARE_FOLDER = "shared_files"
os.makedirs(SHARE_FOLDER, exist_ok=True)

PAGE_TEMPLATE = """
<!DOCTYPE html>
<html><head><title>File Share Server</title></head>
<body>
  <h2>📂 Available Files to Download</h2>
  <ul>{% for file in files %}<li><a href="/download/{{ file }}">{{ file }}</a></li>{% endfor %}</ul>
  <h2>⬆️ Upload a New File</h2>
  <form method="post" action="/upload" enctype="multipart/form-data">
    <input type="file" name="file"><input type="submit" value="Upload">
  </form>
</body></html>
"""

@app.route("/")
def index():
    return render_template_string(PAGE_TEMPLATE, files=os.listdir(SHARE_FOLDER))

@app.route("/download/<path:filename>")
def download_file(filename):
    return send_from_directory(SHARE_FOLDER, filename, as_attachment=True)

@app.route("/upload", methods=["POST"])
def upload_file():
    f = request.files.get("file")
    if not f or not f.filename:
        return jsonify({"error": "No file provided"}), 400
    f.save(os.path.join(SHARE_FOLDER, f.filename))
    return jsonify({"message": "Uploaded successfully", "filename": f.filename})

@app.route("/api/files")
def api_list_files():
    return jsonify({"files": os.listdir(SHARE_FOLDER)})

@app.route("/api/delete/<path:filename>", methods=["DELETE"])
def api_delete(filename):
    p = os.path.join(SHARE_FOLDER, filename)
    if not os.path.exists(p):
        return jsonify({"error": "Not found"}), 404
    os.remove(p)
    return jsonify({"message": "File deleted"})

# Server info API (QR points to frontend)
FRONTEND_URL = "https://share-hub-mauve.vercel.app"  # Your Vercel frontend URL

@app.route("/api/server-info")
def api_server_info():
    backend_port = 5001
    protocol = "https"

    backend_url = f"{protocol}://{FRONTEND_URL}"  # backend URL for API calls
    frontend_url = FRONTEND_URL  # QR code points here

    # Generate QR code
    qr = qrcode.QRCode(box_size=8, border=1)
    qr.add_data(frontend_url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    buf = BytesIO()
    img.save(buf, format="PNG")
    qr_b64 = base64.b64encode(buf.getvalue()).decode()

    return jsonify({
        "status": "online",
        "url": backend_url,
        "qr": f"data:image/png;base64,{qr_b64}",
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
