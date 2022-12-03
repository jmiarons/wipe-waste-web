import base64

from django.core.cache import cache
from django.http import HttpResponse, Http404
from django.shortcuts import redirect
from django.urls import reverse
from django.views import View
from django.views.generic import TemplateView

from trash.models import WrongAnswer, TrashUsed, TrashType, User
from trash.services.disco import DiscoService


class ScanTrash(TemplateView):
    template_name = 'home.html'

    def post(self, request, *args, **kwargs):
        image = request.FILES.get('image', None)
        context = self.get_context_data()
        if image is not None:
            image_bytes = image.read()
            service = DiscoService()
            tag = service.get_tag_from_image(image_bytes)
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            trash_type = TrashType.objects.get(trashtag__name=tag)
            context.update({'trash_type': trash_type, 'image': image_base64, 'possible_tags': service.get_all_tags()})
        else:
            context.update({'error': 'Image is required'})
        cache.set('success_attempts', cache.get('success_attempts', 0) + 1)
        return self.render_to_response(context)


class AddRetrainQueue(View):
    def update_attempts(self):
        cache.set('success_attempts', min(cache.get('success_attempts', 0) - 1, 0))
        cache.set('failed_attempts', min(cache.get('failed_attempts', 0) + 1, 0))

    def post(self, request, *args, **kwargs):
        image = request.POST.get('image', None)
        tag = request.POST.get('tag', None)
        if image is not None and tag is not None and tag in DiscoService().get_all_tags():
            WrongAnswer(image=str(image), tag=tag).save()
            self.update_attempts()
            trash_type = TrashType.objects.get(trashtag__name=tag)
            return redirect(reverse('scan_qr') + '?tag=%s' % trash_type.get_uuid())
        return HttpResponse(status=400)


class ScanTrashContainer(TemplateView):
    template_name = 'scan_container.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        tag = self.request.GET.get('tag', None)
        if tag is None:
            raise Http404()
        context.update({'tag': tag})
        return context

    def get_user(self):
        id_card = self.request.POST.get('id_card', None)
        serial_number = self.request.POST.get('serial_number', None)
        try:
            if id_card is not None:
                return User.objects.get(id_card=id_card)
            if serial_number is not None:
                return User.objects.get(serial_number=serial_number)
        except User.DoesNotExist:
            pass
        return None

    def post(self, request, *args, **kwargs):
        user = self.get_user()
        qr_code = request.POST.get('qr_code', None)
        context = self.get_context_data()
        if user is not None and qr_code is not None:
            error_text = TrashUsed.create_from_qr(qr_code, user)
            if error_text:
                context.update({'error': error_text})
            else:
                context.update({'success': True})
        elif user is None:
            context.update({'error': 'Id card not registered'})
        else:
            context.update({'error': 'The container did not exist'})
        return self.render_to_response(context)
