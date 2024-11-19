import openai
import json
import os
from openai import AzureOpenAI
from langchain_openai import AzureChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from dotenv import load_dotenv


def generate_prompt(task):
    tasks_info = "\n".join([
        f"Task ID: {t['id']}, Weight: {t['weight']}, description: {t['description']}, Deadline: {t['deadline']}"
        for t in task
    ])
    

    
    prompt = f"""
You are an AI assistant that recommand wich task employees started with on the tasks Details.

Tasks Details:
{tasks_info}



Sort tasks through tasks details by wich one the employee should start with. Estimate the best to start with and the all in rank. Return the result as a JSON with the following keys: task_rank which is is the rank of the task and the task_id is the task id
Urgent : the output must only contain json because i have to extract it
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
