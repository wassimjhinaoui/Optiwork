from flask import Flask, request, jsonify
from task_assigner import load_tasks, generate_prompt as assign_generate_prompt, get_assignment, chat_model as assign_chat_model
from task_recommender import generate_prompt as recommend_generate_prompt, get_rank, chat_model as recommend_chat_model
from database_module import get_employees_from_db , get_tasks_from_db # Replace with your actual DB module

app = Flask(__name__)

@app.route('/assign_task', methods=['POST'])
def assign_task():
    try:
        # Get task template from user input
        task_template = request.json
        print(task_template)
        # Fetch employees from the database
        employees = task_template.get('employees')
        task_template = task_template.get('task')
        
        # Load tasks and generate prompt
        tasks = load_tasks(task_template)
        prompt = assign_generate_prompt(tasks, employees)
        
        # Get assignment
        assignment = get_assignment(prompt)
        
        if assignment:
            return jsonify({"assignment": assignment}), 200
        else:
            return jsonify({"error": "Assignment could not be generated"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recommend_task', methods=['POST'])
def recommend_task():
    try:
       
        # Fetch tasks from the database
        tasks_db = get_tasks_from_db()
        
        # Load tasks and generate prompt
        tasks = load_tasks(tasks_db)
        prompt = recommend_generate_prompt(tasks)
        
        # Get task ranking
        ranking = get_rank(prompt)
        
        if ranking:
            return jsonify({"ranking": ranking}), 200
        else:
            return jsonify({"error": "Ranking could not be generated"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)