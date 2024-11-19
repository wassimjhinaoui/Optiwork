import openai
import json
import os
from openai import AzureOpenAI
from langchain_openai import AzureChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from dotenv import load_dotenv

def load_tasks():
    # Task template integrated directly into the code
    ass_tasks  = {
        "tasks": [
            {"id": 1, "weight": 5, "estimated_time": "2 hours", "deadline": "2023-12-01"},
            {"id": 2, "weight": 3, "estimated_time": "1 hour", "deadline": "2023-12-02"},
            {"id": 3, "weight": 8, "estimated_time": "4 hours", "deadline": "2023-12-03"},
            # Add more tasks as needed
        ]
    }
    return ass_tasks
def generate_prompt(task):
    tasks_info = "\n".join([
        f"Task ID: {t['id']}, Weight: {t['weight']}, Estimated Time: {t['estimated_time']}, Deadline: {t['deadline']}"
        for t in task['tasks']
    ])
    

    
    prompt = f"""
You are an AI assistant that recommand wich task employees started with on the tasks Details.

Tasks Details:
{tasks_info}



Sort tasks through tasks details by wich one the employee start with. Estimate the best to start with and the all in rank. Return the result as a JSON with the following keys: task_n while n is the number of the task by rank and the value is the task id
"""
    return prompt
def get_rank(prompt):
    try:
        messages = [
            SystemMessage(content="You recommand the rank of tasks that employee start with"),
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
task = load_tasks()
prompt = generate_prompt(task)
rank = get_rank(prompt)
if rank:
    print("rank Result:")
    print(rank)