import logging

from app.patterns import Singleton


class CityService(metaclass=Singleton):
    def __init__(self) -> None:
        super().__init__()

    def send_signal_to_trash(self, trash):
        logger = logging.getLogger(__name__)
        logger.info('Trash %s opened' % trash.get_uuid())
        print('Trash %s opened' % trash.get_uuid())
