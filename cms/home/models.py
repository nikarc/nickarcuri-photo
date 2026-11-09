from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import MultipleChooserPanel
from wagtail.fields import RichTextField
from wagtail.models import Orderable, Page


class HomePage(Page):
    body = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        "body",
        MultipleChooserPanel("images", label="Images", chooser_field_name="image"),
    ]


class HomePageImage(Orderable):
    page = ParentalKey(HomePage, on_delete=models.CASCADE, related_name="images")
    image = models.ForeignKey(
        "wagtailimages.Image", on_delete=models.CASCADE, related_name="+"
    )

    panels = ["image"]
