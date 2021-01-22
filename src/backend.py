import json

from flask import Flask, request
from flask_restful import Resource, Api
from deep_translator import GoogleTranslator
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.secret_key = "ETFKn!RCNTE&KTU_k6&!K*tU7uK2$xreGe@Q^@yKX74B^ydNkaj@F%746@A@*VU!"
api = Api(app)


class Translation(Resource):
    def post(self):
        data = request.get_json(force=True)
        word = data['word']
        target = data['target']
        # https://stackabuse.com/text-translation-with-google-translate-api-in-python/
        translated = GoogleTranslator(source='auto', target=target).translate(word)
        return translated, 200 if translated is not None else 404


class ToeflResources(Resource):
    def post(self):
        conn = sqlite3.connect("database.db")
        print("Opened database successfully")
        conn.execute("CREATE TABLE IF NOT EXISTS TB_TOEFL (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT, "
                     "tpo_id INTEGER)")

        try:
            data = request.get_json(force=True)
            texto = data['texto']
            tpo_id = data['tpo_id']

            with sqlite3.connect("database.db") as con:
                cur = con.cursor()
                cur.execute("INSERT INTO TB_TOEFL (texto, tpo_id) VALUES (?, ?)", (texto, tpo_id))
                print("Record successfully added")
        except ValueError as e:
            return e

        conn.close()
        return data, 201 if data is not None else 404


class ToeflResourcesList(Resource):
    def get(self):
        from os import path
        ROOT = path.dirname(path.realpath(__file__))
        conn = sqlite3.connect(path.join(ROOT, "database.db"))
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT id, text, tpo_id, lecture, mp3 FROM TB_TOEFL")
        rows = cur.fetchall()
        conn.close()
        data = []
        for row in rows:
            data.append([x for x in row])

        def dictify(data):
            return [dict(zip(("id", "text", "tpo_id", "lecture", "mp3"), vv)) for vv in data]

        return dictify(data)


class ToeflItemResourcesList(Resource):
    def get(self, tpo):
        conn = sqlite3.connect("database.db")
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM TB_TOEFL WHERE tpo_id=?;", [tpo])
        rows = cur.fetchall()
        conn.close()

        data = eval(json.dumps([tuple(row) for row in rows]))
        print(data[0][1])
        return eval(json.dumps([tuple(row) for row in rows]))


class ImportFromYoutube(Resource):
    def post(self):
        from youtube_transcript_api import YouTubeTranscriptApi
        try:
            data = request.get_json(force=True)
            video = data['video']
            name = data['name']
            extract = "="
            video_id = video[video.index(extract) + len(extract):]
            thumbnail = "https://i.ytimg.com/vi/" + video_id + "/maxresdefault.jpg"

        except ValueError as e:
            return e

        try:
            YouTubeTranscriptApi.get_transcript(video_id)
            new = []
            for i in YouTubeTranscriptApi.get_transcript(video_id):
                new.append(i['text'])
            new = ''.join(new)
            print(new)
            print(video_id)
        except ValueError as e:
            return e

        from os import path
        ROOT = path.dirname(path.realpath(__file__))
        with sqlite3.connect(path.join(ROOT, "database.db")) as con:
            cur = con.cursor()
            cur.execute("INSERT INTO TB_IMPORT (video_id, text, video, name, thumbnail) VALUES (?, ?, ?, ?, ?)",
                        (video_id, new, video, name, thumbnail))
            print("Record successfully added")
            # con.close()

        return "Record successfully added", 201


class ImportsFromYoutube(Resource):
    def get(self):
        from os import path
        ROOT = path.dirname(path.realpath(__file__))
        conn = sqlite3.connect(path.join(ROOT, "database.db"))
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT video_id, text, video, thumbnail, name, likes, dislikes FROM TB_IMPORT")
        rows = cur.fetchall()
        conn.close()
        data = []
        for row in rows:
            data.append([x for x in row])

        return [dict(zip(("video_id", "text", "video", "thumbnail", "name", "likes", "dislikes"), vv)) for vv in data]


class YoutubeLessonsLike(Resource):
    def post(self):
        try:
            data = request.get_json(force=True)
            video_id = data['video_id']
        except ValueError as e:
            print(e)

        from os import path
        ROOT = path.dirname(path.realpath(__file__))
        conn = sqlite3.connect(path.join(ROOT, "database.db"))
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("UPDATE TB_IMPORT SET likes = (( SELECT ifnull(likes, 0) FROM TB_IMPORT WHERE video_id = ?) + 1) WHERE video_id = ?;", (video_id, video_id))
        conn.commit()
        conn.close()
        return "Ok", 201


class StudyByLesson(Resource):
    def post(self):
        from os import path
        data = request.get_json(force=True)
        video_id = data['video_id']
        ROOT = path.dirname(path.realpath(__file__))
        conn = sqlite3.connect(path.join(ROOT, "database.db"))
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT video_id, text, video, thumbnail, name FROM TB_IMPORT WHERE video_id =?;", [video_id])
        rows = cur.fetchall()
        conn.close()

        data = []
        for row in rows:
            data.append([x for x in row])

        return [dict(zip(("video_id", "text", "video", "thumbnail", "name"), vv)) for vv in data]


api.add_resource(Translation, '/translation')
api.add_resource(ToeflResourcesList, '/toefl')
api.add_resource(ToeflItemResourcesList, '/toefl/<int:tpo>')
api.add_resource(ToeflResources, '/store')
api.add_resource(ImportFromYoutube, '/import')
api.add_resource(ImportsFromYoutube, '/imports')
api.add_resource(StudyByLesson, '/studybylesson')
api.add_resource(YoutubeLessonsLike, '/likes')



@app.route('/')
def index():
    return "Index"


if __name__ == "__main__":
    app.run(debug=True)
