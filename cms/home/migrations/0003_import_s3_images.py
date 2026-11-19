"""
Register the photos that were uploaded straight to the S3 bucket under
``images/`` as Wagtail images, so they show up in the image library.

The metadata below was read from the bucket on 2026-11-08. Nothing is read
from or written to S3 when this migration runs.
"""

import os

from django.db import migrations

# (storage key, width, height, file size in bytes, sha1 of the file)
S3_IMAGES = [
    ("images/01-20221116-DSCF0003-IridientEdit.avif", 1600, 1600, 241575, "5d5c270f4d9b135125f6dff355696e25ed12e52d"),
    ("images/01-20221116-DSCF0003-IridientEdit.webp", 1600, 1600, 434040, "4ad5e0f34e34a060a20ac45be993d3cea59bbe66"),
    ("images/01-20221116-DSCF0003-IridientEdit_FULL.avif", 2000, 2000, 327370, "419a5a3b8f1073ba49330ebdc5b8e86f2137d23d"),
    ("images/01-20221116-DSCF0003-IridientEdit_FULL.webp", 3736, 3736, 1161010, "3dbec9d3a74ffce82da01f76230e8da96905beea"),
    ("images/02-20221118-DSCF0001-IridientEdit.avif", 1600, 1067, 103645, "37d3c8a5ae404bebe1c661e7dced9c2c35287306"),
    ("images/02-20221118-DSCF0001-IridientEdit.webp", 1600, 1067, 230734, "d7f36443b552947ae7a428203efa60dca83ad030"),
    ("images/02-20221118-DSCF0001-IridientEdit_FULL.avif", 2000, 1333, 167004, "e4a07888ffdd4b360e0124e4e9daed22a86b25ef"),
    ("images/02-20221118-DSCF0001-IridientEdit_FULL.webp", 5664, 3776, 2313824, "43d55ffddfeaec45d4f3f4a28c77951b9e39b483"),
    ("images/20230110-DSCF0001-IridientEdit.avif", 1600, 1067, 65160, "ed7275f7da67b086a8c1f262b489534fdb264747"),
    ("images/20230110-DSCF0001-IridientEdit.webp", 1600, 1067, 128530, "fc4be7d0ffe8b53959dac46d6a64016381497a53"),
    ("images/20230110-DSCF0001-IridientEdit_FULL.avif", 2000, 1333, 109684, "b72db35665cce5f33398b443e00182734bb597a5"),
    ("images/20230110-DSCF0001-IridientEdit_FULL.webp", 5803, 3869, 1032972, "c3740b3b468574f5c3b8b35e4dd92fef870da6db"),
    ("images/DSCF0012-IridientEdit-Pano-positive.avif", 1600, 1600, 115400, "07f5ededb51b7ddbe9b78cbee208012e200f9be3"),
    ("images/DSCF0012-IridientEdit-Pano-positive.webp", 1600, 1600, 232998, "a83f80ae22231864dbe42e0d685eb06fcc29001b"),
    ("images/DSCF0012-IridientEdit-Pano-positive_FULL.avif", 2000, 2000, 161507, "222272fce6476f7c7cbeacabc907c811714e0875"),
    ("images/DSCF0012-IridientEdit-Pano-positive_FULL.webp", 5654, 5654, 1140664, "7fbb9770fd7c6b7e09afa6262815395c65e81449"),
    ("images/DSCF0030_positive.avif", 1333, 2000, 293832, "594e9ca3583d85af6793b19b3db95f30d182868e"),
    ("images/DSCF0030_positive.webp", 1600, 2401, 700842, "2a6647b36bd7f00772af52bbadb977db1f83b9a8"),
    ("images/DSCF0030_positive_FULL.avif", 1333, 2000, 360909, "e1792d7bb3edeb328f2205e151903812e785511a"),
    ("images/DSCF0030_positive_FULL.webp", 1365, 2048, 731284, "08022b356af35886e58a3c1ba3ec20e487fce268"),
    ("images/DSCF8612-positive.avif", 1333, 2000, 126962, "dfcf2825889c41710879e2889117f6f2a16f4d9e"),
    ("images/DSCF8612-positive.webp", 1600, 2400, 373826, "4807994f6aca5e5f37f4e3b9bbb0441c436f89ea"),
    ("images/DSCF8612-positive_FULL.avif", 1333, 2000, 133486, "329f36088cdfbd19ea5a9057a120669e85a63f62"),
    ("images/DSCF8612-positive_FULL.webp", 3780, 5670, 1991460, "15dcada429b1d257367fd6e7a7b5e6b637348faf"),
    ("images/DSCF8614-positive.avif", 1600, 1067, 46811, "42784055e3ed113d781f8a37d6ad8408835104b9"),
    ("images/DSCF8614-positive.webp", 1600, 1067, 118600, "1f40848eb814dc229c856c0b162516909e73e0e4"),
    ("images/DSCF8614-positive_FULL.avif", 2000, 1333, 108343, "59109e21670b99f207bca3cf7642e439a2aefc92"),
    ("images/DSCF8614-positive_FULL.webp", 5625, 3750, 1959980, "2e810048030d3c665e37e16b3d829641f5c2f616"),
    ("images/x012--2.avif", 1600, 1600, 82200, "c96c8e419f73f0f055555d8821fcc542641c9efc"),
    ("images/x012--2.webp", 1600, 1600, 173294, "f9ff15b141a6c4e0f07f8e7008690912ca1397bd"),
    ("images/x012--2_FULL.avif", 2000, 2000, 113532, "e070761fa3bab8c5b7acc21eabda35876b7c4236"),
    ("images/x012--2_FULL.webp", 5508, 5508, 1666910, "f945b7482c29a7ebad8ea2dc35db01fc9e1a0b8c"),
]


def create_images(apps, schema_editor):
    Image = apps.get_model("wagtailimages", "Image")
    Collection = apps.get_model("wagtailcore", "Collection")
    root_collection = Collection.objects.get(depth=1)

    for key, width, height, file_size, file_hash in S3_IMAGES:
        Image.objects.get_or_create(
            file=key,
            defaults={
                "title": os.path.basename(key),
                "width": width,
                "height": height,
                "file_size": file_size,
                "file_hash": file_hash,
                "collection": root_collection,
            },
        )


def remove_images(apps, schema_editor):
    # Removes the database rows only; the files stay in S3.
    Image = apps.get_model("wagtailimages", "Image")
    Image.objects.filter(file__in=[key for key, *_ in S3_IMAGES]).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0002_create_homepage"),
        ("wagtailimages", "0027_image_description"),
    ]

    operations = [
        migrations.RunPython(create_images, remove_images),
    ]
