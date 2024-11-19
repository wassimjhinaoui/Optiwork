from flask import Flask, request, jsonify
from task_assigner import generate_prompt as assign_generate_prompt, get_assignment, chat_model as assign_chat_model
from task_recommender import generate_prompt as recommend_generate_prompt, get_rank, chat_model as recommend_chat_model
from flask_cors import CORS
import os

app = Flask(__name__)

# Configure CORS properly
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],  # Allow your Next.js frontend
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.route('/assign_task', methods=['POST'])
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
"""

@app.route('/recommend_task', methods=['POST'])
def recommend_task():
    
    Endpoint to recommend tasks based on input and ranking logic.
    
    try:
        # Fetch tasks from the database
        tasks_db = get_tasks_from_db()

        if not tasks_db:
            return jsonify({"error": "No tasks available in the database"}), 404

        # Generate prompt and get task ranking
        prompt = recommend_generate_prompt(tasks_db)
        ranking = get_rank(prompt)

        if ranking:
            return jsonify({"ranking": ranking}), 200
        else:
            return jsonify({"error": "Ranking could not be generated"}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)"""
