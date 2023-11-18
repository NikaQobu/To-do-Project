class Validations:
    @staticmethod
    def is_valid_name(name):
        if name.isalpha() and 2 <= len(name) <= 18:
            return True
        else:
            return False

    @staticmethod
    def is_valid_lastname(lastname):
        if lastname.isalpha() and 2 <= len(lastname) <= 18:
            return True
        else:
            return False

    @staticmethod
    def is_valid_phone(phone):
        if phone.isdigit() and len(phone) == 9:
            return True
        else:
            return False

    @staticmethod
    def is_valid_user(user):
        if user.isalnum() and 4 <= len(user) <= 18:
            return True
        else:
            return False

    @staticmethod
    def is_valid_password(password):
        if len(password) >= 8 and len(password) < 18:
            return True
        else:
            return False


