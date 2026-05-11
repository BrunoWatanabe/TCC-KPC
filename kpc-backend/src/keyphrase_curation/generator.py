import openai
import re
from . import CONFIG


class KeyphraseGenerator:
    def __init__(self):
        ...

    def generate(self, generator, prompt_type):
        return generator(prompt_type)


class ChatGptGenerator:
    PRO_ARGUMENTS_PROMPT = 'PRO_ARGUMENTS_PROMPT'
    AGAINST_ARGUMENTS_PROMPT = 'AGAINST_ARGUMENTS_PROMPT'
    NAMED_ENTITIES_PROMPT = 'NAMED_ENTITIES_PROMPT'

    def __init__(self, topic, count, keyphrase_size=3):
        self.topic = topic
        self.count = count
        self.keyphrase_size = keyphrase_size
        self.prompts = {
            ChatGptGenerator.PRO_ARGUMENTS_PROMPT:
                f"list {self.count} main short keyphrases of pro arguments about {self.topic}, "
                f"limiting the number of keywords to {self.keyphrase_size}. ",
            ChatGptGenerator.AGAINST_ARGUMENTS_PROMPT:
                f"list {self.count} main keyphrases of arguments against about {topic},"
                f" limiting the number of keywords to {self.keyphrase_size}.",
            ChatGptGenerator.NAMED_ENTITIES_PROMPT:
                "What is the {self.count} main cited named entities "
                f"in arguments about {topic}."
        }
        openai.api_key = CONFIG["OPENAI_API_TOKEN"]
        self.model = CONFIG["OPENAI_API_MODEL"]
        self.temperature = float(
            CONFIG["OPENAI_API_TEMPERATURE"])
        self.max_tokens = int(
            CONFIG["OPENAI_API_MAX_TOKENS"])

    def __call__(self, prompt_type=PRO_ARGUMENTS_PROMPT):
        result = []
        prompt = self.prompts[prompt_type]
        response = openai.ChatCompletion.create(
            model=self.model,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        keyphrases_str = response['choices'][0]['message']['content']
        for keyphrase_str in keyphrases_str.split('\n'):
            keyphrase = re.sub(r'^\d+\.\s*', '', keyphrase_str)
            keyphrase.strip('"')
            result.append(keyphrase)
        return result
