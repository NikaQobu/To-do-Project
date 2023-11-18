import re

class Validations:
    @staticmethod
    def is_valid_name(name):
        if name.isalpha() and 2 <= len(name) <= 18:
            return True
        else:
            return False

    @staticmethod
    def is_valid_email(mail):
        # Regular expression pattern for basic email validation
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        
        if re.match(pattern, mail):
            return True
        else:
            return False

    @staticmethod
    def is_valid_message(message):
        if 2 <= len(message):
            return True
        else:
            return False
