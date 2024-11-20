from flask import Flask, request, jsonify
from task_assigner import generate_prompt as assign_generate_prompt, get_assignment, chat_model as assign_chat_model
from task_recommender import generate_prompt as recommend_generate_prompt, get_rank, chat_model as recommend_chat_model
from flask_cors import CORS,cross_origin
import os

app = Flask(__name__)
# Configure CORS properly
CORS(app, resources={r"/*": {"origins": "*"}})
@app.route('/assign_task', methods=['POST', 'OPTIONS'])
@cross_origin()
def assign_task():
    try:
        # Parse input JSON
        data = request.json
        if not data:
            return jsonify({"error": "Invalid input, JSON payload required"}), 400
        
        employees = data.get('employees')
        task_template = data.get('task')
        
        if not task_template:
            return jsonify({"error": "Task template is required"}), 400
        
        # Generate prompt and get assignment
        prompt = assign_generate_prompt(task_template, employees)
        assignment = get_assignment(prompt)
        
        if assignment:
            return jsonify({"assignment": assignment}), 200
        else:
            return jsonify({"error": "Assignment could not be generated"}), 500
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/recommend_task', methods=['POST', 'OPTIONS'])
@cross_origin()
def recommend_task():
    try:
        # Generate prompt and get task ranking
        data = request.json
        
        if not data:
            return jsonify({"error": "Invalid input, JSON payload required"}), 400
        
        tasks = data.get('tasks')
        print(tasks)
        
        prompt = recommend_generate_prompt(tasks)
        ranking = get_rank(prompt)
        
        if ranking:
            return jsonify({"ranking": ranking}), 200
        else:
            return jsonify({"error": "Ranking could not be generated"}), 500
    
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Add a before_request handler to handle OPTIONS requests""""
"""@app.before_request
def handle_preflight():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        
        # Add CORS headers
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000, http://web:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        
        return response
"""
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)