from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import MultipleChooserPanel
from wagtail.api import APIField
from wagtail.fields import RichTextField
from wagtail.images.api.fields import ImageRenditionField
from wagtail.models import Orderable, Page


class HomePage(Page):
    body = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        "body",
        MultipleChooserPanel("images", label="Images", chooser_field_name="image"),
    ]

    api_fields = [
        APIField("body"),
        APIField("images"),
    ]


class HomePageImage(Orderable):
    page = ParentalKey(HomePage, on_delete=models.CASCADE, related_name="images")
    image = models.ForeignKey(
        "wagtailimages.Image", on_delete=models.CASCADE, related_name="+"
    )

    panels = ["image"]

    api_fields = [
        APIField("image"),
        APIField(
            "image_full",
            serializer=ImageRenditionField("max-2400x2400|format-avif", source="image"),
        ),
        APIField(
            "image_thumb",
            serializer=ImageRenditionField("max-800x800|format-avif", source="image"),
        ),
    ]
