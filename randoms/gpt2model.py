import pandas as pd

from transformers import GPT2Tokenizer, GPT2LMHeadModel

import re

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    tokens = text.split()
    return ' '.join(tokens)

df = pd.read_excel('/Due_Diligence_Sheets.xlsx')

df = df.iloc[:, 3:6]

questions = df.iloc[:, 0]

response_types = df.iloc[:, 1]

combined_inputs = questions + " (" + response_types + ")"

desired_output = df.iloc[:, 2]

tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

tokenizer.pad_token = tokenizer.eos_token

model = GPT2LMHeadModel.from_pretrained('gpt2')

print(df.head())

def generate_predictions(text):
    inputs = tokenizer.encode_plus(text, return_tensors='pt', padding=True, truncation=True)
    input_ids = inputs['input_ids']
    attention_mask = inputs['attention_mask']
    outputs = model.generate(input_ids=input_ids, attention_mask=attention_mask, max_length=500, pad_token_id=tokenizer.eos_token_id)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

predictions = combined_inputs.apply(generate_predictions)

results = pd.DataFrame({'question': questions, 'response_type': response_types, 'desired_output': desired_output, 'prediction': predictions})

print(results.head())