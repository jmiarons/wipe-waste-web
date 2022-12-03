from django.views.generic import TemplateView

from trash.services.disco import DiscoService


class ScanTrash(TemplateView):
    template_name = ''

    def post(self, request, *args, **kwargs):
        image = request.POST.get('image', None)
        tag = DiscoService().get_tag_from_image(image)
        context = self.get_context_data()
        context.update({'tag': tag, 'image': image})
        return self.render_to_response(context)


class AddRetrainQueue(TemplateView):
    template_name = ''
