import face_recognition
import cv2
import base64
import os
import numpy as np
from flask import *
from flask_cors import CORS
import mysql.connector as conn
app = Flask(__name__)
CORS(app)

def get_data(email):
    user = []
    HOST = os.getenv('HOST') or "localhost"
    con = conn.connect(host=HOST, database='app_db',user='root', password='my_secret_password', charset='utf8', port=3306)
    cursor = con.cursor()
    sql = "SELECT * FROM `users` WHERE `email` = %s"
    cursor.execute(sql, (email,))
    result = cursor.fetchone()
    if(result != None):
        l = []
        l.append(result[1])
        strings = result[3].split(";")
        for string in strings:
            strx = string[1:-2]
            print(strx)
            nums = []
            for x in strx.split():
                nums.append(float(x.strip()))
            l.append(nums)
            l.append(result[0])
            user.append(l)
    cursor.close()
    con.close()
    return user

@app.route('/api')
def index():
    return render_template("index.html")

@app.route('/api/histories', methods=['GET'])
def histories():
    user_id = request.get_json()['user_id']
    sql = "SELECT * FROM `login_histories` WHERE user_id = %s"
    HOST = os.getenv('HOST') or "localhost"
    con = conn.connect(host=HOST, database='app_db',user='root', password='my_secret_password', charset='utf8', port=3306)
    cursor = con.cursor()
    
    cursor.execute(sql, (user_id,))
    result = cursor.fetchall()
    cursor.close()
    con.close()
    return result

@app.route('/api/register', methods=['POST'])
def register():
    email = request.get_json()['email']
    user = get_data(email)
    if(user != []):
        return "Email exists!"
    HOST = os.getenv('HOST') or "localhost"
    con = conn.connect(host=HOST, database='app_db',user='root', password='my_secret_password', charset='utf8', port=3306)
    cursor = con.cursor()
    sql = "insert into users (name, encoding, email) values(%s,%s,%s)"
    name = request.get_json()['name']
    imgUpload = request.get_json()['encode']
    imgs = imgUpload.split(',,')
    encodings = []
    for img in imgs:
        nparr = np.fromstring(base64.b64decode(img), np.uint8)
        img2 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        face_locations = []
        face_encodings = []
        small_frame = cv2.resize(img2, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = small_frame[:, :, ::-1]
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        if(face_locations != [] and face_encodings != []):
            encodings.append(face_encodings)
    encodingToSave = ""
    for encodeimg in encodings:
        encoding = ""
        for i in encodeimg:
            encoding += str(i)+","
        encodingToSave += str(encoding) + ";"
    print(len(encodingToSave))
    li = [name, encodingToSave, email]
    value = tuple(li)
    cursor.execute(sql, value)
    con.commit()
    cursor.close()
    con.close()
    return "Done"

@app.route("/api/login", methods=['POST'])
def login():
    email = request.get_json()['email']
    user = get_data(email)
    imgUpload = request.get_json()['encode']
    class_id = request.get_json()['class_id']
    sql = "insert into login_histories (user_id, class_id) values(%s,%s)"
    if(user == []):
        return "You are unknown first register your self, -1"
    else:
        userId = [i[2] for i in user][0]
        HOST = os.getenv('HOST') or "localhost"
        con = conn.connect(host=HOST, database='app_db',user='root', password='my_secret_password', charset='utf8', port=3306)
        cursor = con.cursor()
        known_face_encodings = [i[1] for i in user]
        print("known_face_encodings")
        print(len(known_face_encodings))
        known_face_names = [i[0] for i in user]
        imgs = imgUpload.split(',,')
        print("imgs")
        print(len(imgs))
        encodings = []
        for img in imgs:
            nparr = np.fromstring(base64.b64decode(img), np.uint8)
            img2 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            face_locations = []
            face_encodings = []
            small_frame = cv2.resize(img2, (0, 0), fx=0.25, fy=0.25)
            rgb_small_frame = small_frame[:, :, ::-1]
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
            if(face_locations != [] and face_encodings != []):
                encodings.append(face_encodings)

        face_names = []
        print("encodings")
        print(len(encodings))
        if(encodings == []):
            cursor.execute(sql, (userId, "-2"))
            con.commit()
            cursor.close()
            con.close()
            return "Faces not found!" + "," + str(-1)
        else:
            for encoding in encodings:
                for face_encoding in encoding:
                    matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                    print("print(matches)")
                    print(matches)
                    name = "Unknown"
                    face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                    print("print(face_distances)")
                    print(face_distances)
                    best_match_index = np.argmin(face_distances)
                    if (face_distances[best_match_index] <= 0.3):
                        name = known_face_names[best_match_index]
                    if(name == "Unknown"):
                        cursor.execute(sql, (userId, "-1"))
                        con.commit()
                        cursor.close()
                        con.close()
                        return "Unknown" + "," + str(-1)
                    face_names.append(name)
        print(userId)
        print(class_id)
        cursor.execute(sql, (userId, class_id))
        con.commit()
        cursor.close()
        con.close()
    return ",".join(face_names) + "," + str(userId)
if __name__ == '__main__':
    app.run(debug=True)
