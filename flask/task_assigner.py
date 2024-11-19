# employees.py
import openai
import json
import os
from openai import AzureOpenAI
from langchain_openai import AzureChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from dotenv import load_dotenv

def load_task():
    # Task template integrated directly into the code
    task = {
        "task_name": "Implement Feature X",
        "task_description": "Develop and integrate Feature X into the existing system. The feature should allow users to do Y and Z.",
        "required_skills": ["Python", "REST API"],
        "additional_notes": "Please ensure the feature is scalable and includes unit tests."
    }
    return task
def generate_prompt(task, employees):
    employee_info = "\n".join([
        f"{emp['id']}: {emp['name']}, Skills: {', '.join(emp['skills'])}, Available: {emp['availability']}"
        for emp in employees if emp['availability']
    ])
    prompt = f"""
You are an AI assistant that assigns tasks to employees based on their skills.

Task Details:
Name: {task['task_name']}
Description: {task['task_description']}
Required Skills: {', '.join(task['required_skills'])}
Additional Notes: {task['additional_notes']}

Available Employees:
{employee_info}

Assign the two best-suited employees for this task. Estimate the weight (1-10), time in hours, and provide a deadline (YYYY-MM-DD). Return the result as a JSON with the following keys: task_name, assigned_employees (list of employee ids), estimated_weight, estimated_time, deadline.
"""
    return prompt
def get_assignment(prompt):
    try:
        messages = [
            SystemMessage(content="You help assign tasks to employees based on their skills."),
            HumanMessage(content=prompt)
        ]
        response = chat_model.invoke(messages)
        return response.content
    except Exception as e:
        print(f"An error occurred during the API call: {e}")
        return None
load_dotenv()

# Initialize chat model with environment variables
chat_model = AzureChatOpenAI(
    azure_endpoint=os.getenv("AZURE_ENDPOINT"),
    openai_api_key=os.getenv("OPENAI_API_KEY"),
    deployment_name=os.getenv("DEPLOYMENT_NAME"),
    openai_api_version=os.getenv("OPENAI_API_VERSION")
)
task = load_task()
prompt = generate_prompt(task, employees)
assignment = get_assignment(prompt)
if assignment:
    print("Assignment Result:")
    print(assignment)