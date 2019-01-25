class ChoicesMeta(type):
    def __contains__(cls, item):
        return item in cls.__dict__.values()


class Versions(metaclass=ChoicesMeta):
    VDCC = 'vdcc'
    NTR = 'ntr'
    ESV = 'esv'
