from django.core.cache import cache
from django.core.management import BaseCommand

from trash.models import WrongAnswer
from trash.services.disco import DiscoService


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
        success = cache.get('success_attempts', 0)
        failed = cache.get('failed_attempts', 0)
        if failed / max(success + failed, 1) > 0.25:
            queryset = WrongAnswer.objects.all()
            images = tags = []
            for item in queryset:
                images.append(item.image)
                tags.append(item.tag)
            DiscoService().retrain_from_data(images, tags)
            queryset.delete()
            self.stdout.write(self.style.SUCCESS('Retrained model with %s' % len(tags)))
        self.stdout.write(self.style.SUCCESS('No retrain needed'))
