from app.patterns import Singleton


class DiscoService(metaclass=Singleton):
    def __init__(self) -> None:
        super().__init__()

    def get_all_tags(self):
        return ['Aluminium', 'Carton', 'Glass', 'Organic Waste', 'Other Plastics', 'Paper and Cardboard', 'Plastic',
                'Textiles', 'Wood']

    def convert_response_to_tag(self, response_list):
        index = min(range(len(response_list)), key=response_list.__getitem__)
        return self.get_all_tags()[index]

    def get_tag_from_image(self, image):
        pass

    def retrain_from_data(self, image_list, tag_list):
        pass
