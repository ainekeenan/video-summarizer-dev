from flask import Flask, jsonify, request
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi as yt
import re
import google.generativeai as genai
import json

# Configure generative AI
genai.configure(api_key="")

# Define the generative model
model = genai.GenerativeModel(model_name="gemini-1.0-pro")

app = Flask(__name__)
CORS(app)

def get_video_id(url):
    pattern = r"(?<=v=)[a-zA-Z0-9_-]+(?=&|\?|$)"
    match = re.search(pattern, url)
    if match:
        return match.group()
    else:
        return None

@app.route("/", methods=['POST'])
def process_youtube_link():
    data = request.json
    youtube_link = data.get("youtubeLink")
    userm = data.get("usermsg")
    modelm = data.get("modelmsg")
    cv = []
    for i in range(len(userm)):
        cv.append({
            "parts": [{"text": userm[i]}],
            "role": "user"
        })
        cv.append({
            "parts": [{"text": modelm[i]}],
            "role": "model"
        })
    # link_success = False
    transcript_text = ""
    print(youtube_link)
    print(userm)
    print(modelm)
    print(cv)
    print(json.dumps(cv))
    convo = model.start_chat(history = cv)


    if youtube_link:
        video_id = get_video_id(youtube_link)
        if len(cv) != 0:
            command = f"Answer the question {youtube_link} based on the chat history. Make it seamless as if this is a conversation and you are just responding to the question. Only reply with the answer, do not include any headers or anything uneccesary."
            response = convo.send_message(command)
            print("hit")
            summary = response.text
            return jsonify({
            'summary': summary,
        })
        elif video_id:
            try:
                transcript = yt.get_transcript(video_id)
                transcript_text = " ".join([entry['text'] for entry in transcript])
                command = f"Do not use markdown or any fancy formatting, only pure text. Reply in complete full sentences, no bullet points. Strictly only reply in a summary and summarize, {transcript_text}."
                response = convo.send_message(command)
                summary = response.text
                link_success = True  # Set link_success to True after successful processing
                
                return jsonify({
                    'summary': summary,
                    'transcript': transcript_text,
                })
            except Exception as e:
                print("Error:", e)
                return jsonify({
                    'summary': "Error getting transcript.",
                    'transcript': "No transcript available.",
                })
        else:
            return jsonify({
                'summary': "Invalid YouTube link.",
                'transcript': "No transcript.",
            })
    else:
        return jsonify({
            'summary': "Please enter link.",
            'transcript': "No transcript.",
        })

if __name__ == "__main__":
    app.run(debug=True, port=8080)
