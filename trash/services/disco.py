from app.patterns import Singleton
import requests, json


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
        url = 'http://localhost:9002/tagImage'
        headers = {
            # requests won't add a boundary if this header is set when you pass files=
            # 'Content-Type': 'multipart/form-data',
        }
        files = {
            'file': image,
        }
        response = requests.post(url, headers=headers, files=files)
        return response.json()['trashType']

    def retrain_from_data(self, image_list, tag_list):
        pass
