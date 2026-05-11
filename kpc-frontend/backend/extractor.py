import glob
import spacy
# import pytextrank
from collections import Counter
from string import punctuation
from keybert import KeyBERT
import yake
from multi_rake import Rake


class KeyphraseExtractor:
    '''Produces keyphrases with a extraction method
    '''

    def __init__(self, texts={}):
        self.texts = texts

    def load_texts(self, path, extension="txt", reload=True):
        if reload:
            self.texts = {}
        for _file in glob.glob(f"{path}/*.{extension}"):
            with open(_file, 'r') as f:
                self.texts[_file] = f.read()

    @property
    def texts_path(self):
        return list(self.texts.keys())

    @property
    def texts_content(self):
        return list(self.texts.values())

    @property
    def all_content(self):
        result = ''
        for content in self.texts_content:
            result += f"{content}\n"
        return result

    def extract(self, extractor, count=40):
        return extractor(self.all_content, count)


class SpacyExtractor():
    def __init__(self, model="en_core_web_sm"):
        if not spacy.util.is_package(model):
            spacy.cli.download(model)
        self.nlp = spacy.load(model)
        self.nlp.max_length = 2000000

    def __call__(self, text, count):
        result = []
        hotwords = []
        pos_tag = ['NOUN']
        doc = self.nlp(text.lower())
        for token in doc:
            if (token.text in self.nlp.Defaults.stop_words or
                    token.text in punctuation):
                continue
            if (token.pos_ in pos_tag):
                hotwords.append(token.text)
        most_common_list = Counter(set(hotwords)).most_common(count)
        for item in most_common_list:
            result.append(item[0])
        return result


class TextrankExtractor():
    def __init__(self, model="en_core_web_sm"):
        if not spacy.util.is_package(model):
            spacy.cli.download(model)
        self.nlp = spacy.load(model)

    def __call__(self, text, count):
        component = "textrank"
        if component not in self.nlp.pipe_names:
            self.nlp.add_pipe("textrank")
        doc = self.nlp(text)
        result = []
        for phrase in doc._.phrases[:count]:
            result.append(phrase.text)
        return result


class KeybertExtractor():
    def __init__(self, show_distance=False):
        self.model = KeyBERT()
        self.show_distance = show_distance

    def __call__(self, text, count):
        result = []
        keywords = self.model.extract_keywords(
            text,
            top_n=count,
            stop_words=[])
        for keyword in keywords[0:count]:
            if self.show_distance:
                result.append(keyword)
            else:
                result.append(keyword[0])
        return result


class YakeExtractor():
    def __init__(self, show_distance=False):
        self.show_distance = show_distance

    def __call__(self, text, count):
        result = []
        kw_extractor = yake.KeywordExtractor(top=count)
        keywords = kw_extractor.extract_keywords(text)
        for keyword in keywords[0:count]:
            if self.show_distance:
                result.append(keyword)
            else:
                result.append(keyword[0])
        return result


class RakeExtractor():
    def __init__(self, show_distance=False):
        self.show_distance = show_distance

    def __call__(self, text, count):
        result = []
        rake = Rake()
        keywords = rake.apply(text)
        for keyword in keywords[:count]:
            if self.show_distance:
                result.append(keyword)
            else:
                result.append(keyword[0])
        return result
