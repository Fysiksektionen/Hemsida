from website.models.media import Image
from rest_framework import serializers, generics 
from utils.serializers import DBObjectSerializer

class ImageSerializer(DBObjectSerializer):
    """Serializer for rendering an image"""

    class Meta: 
        model = Image
        depth = 1
        fields = '__all__'

class ImagesView(generics.ListCreateAPIView):
    """A simple view for listing and creating images"""
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

class ImageView(generics.RetrieveUpdateDestroyAPIView):
    """"A simple view for fetching, updating and deleting images."""
    serializer_class = ImageSerializer
    queryset = Image.objects.all()