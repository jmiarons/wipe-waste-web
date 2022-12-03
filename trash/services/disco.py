from app.patterns import Singleton


class DiscoService(metaclass=Singleton):
    def __init__(self) -> None:
        super().__init__()

    def get_tag_from_image(self, image):
        pass

    def retrain_from_data(self, image_list, tag_list):
        pass
