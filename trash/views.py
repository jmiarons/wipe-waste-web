from django.core.cache import cache
from django.http import HttpResponse, Http404
from django.shortcuts import redirect
from django.urls import reverse
from django.views.generic import TemplateView

from trash.models import WrongAnswer, TrashUsed, TrashType
from trash.services.disco import DiscoService


class ScanTrash(TemplateView):
    template_name = ''

    def post(self, request, *args, **kwargs):
        image = request.FILES.get('image', None)
        context = self.get_context_data()
        if image is not None:
            service = DiscoService()
            tag = service.get_tag_from_image(image)
            trash_type = TrashType.objects.get(trashtag_set__name=tag)
            context.update({'trash_type': trash_type, 'image': image, 'possible_tags': service.get_all_tags()})
        else:
            context.update({'error': 'Image is required'})
        cache.set('success_attempts', cache.get('success_attempts', 0) + 1)
        return self.render_to_response(context)


class AddRetrainQueue(TemplateView):
    template_name = ''

    def update_attempts(self):
        cache.set('success_attempts', min(cache.get('success_attempts', 0) - 1, 0))
        cache.set('failed_attempts', min(cache.get('failed_attempts', 0) + 1, 0))

    def post(self, request, *args, **kwargs):
        image = request.POST.get('image', None)
        tag = request.POST.get('tag', None)
        if image is not None and tag is not None:
            WrongAnswer(image=str(image), tag=tag).save()
            self.update_attempts()
            return redirect(reverse('url-result') + '?tag=%s' % tag)
        return HttpResponse(status=400)


class ScanTrashContainer(TemplateView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        tag = self.request.GET.get('tag', None)
        if tag is None:
            raise Http404()
        context.update({'tag': tag})
        return context

    def post(self, request, *args, **kwargs):
        id_card = request.POST.get('id_card', None)
        qr_code = request.POST.get('qr_code', None)
        context = self.get_context_data()
        if id_card is not None and qr_code is not None:
            TrashUsed.create_from_qr(qr_code, id_card)
            context.update({'success': True})
        return self.render_to_response(context)
