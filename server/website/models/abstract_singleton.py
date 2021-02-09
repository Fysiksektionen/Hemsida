from django.core.cache import cache
from django.db import models
from django.db.models.base import ModelBase


class SingletonBase(ModelBase):
    """I have seen like +5 different ways to override __new__ but none for the current version of DJango
        I have a somewhat informed guess that this would be the best way to override for this django version.
        I don't even know if this is a proper way to code the function, it is also a guess.
        Please comment on this.
    """
    def __new__(cls, *args, **kwargs):
        new_obj = cache.get(cls.__name__)
        if new_obj is None:
            new_obj = super.__new__()
        return new_obj


class SingletonModel(models.Model, metaclass=SingletonBase):
    """
    An abstract singleton setup for a model.
    """

    class Meta:
        abstract = True

    # Overriding the __new__ is done in  SingletonBase

    @classmethod
    def instance(cls):
        """Gets the instance of this singleton"""
        inst = cache.get(cls.__name__)  # use cache to reduce database requests, could also make your own cache
        if inst is None:
            inst, created = cls.objects.get_or_create(pk=1)
            if not created:
                inst.set_cache()
        return inst

    def save(self, *args, **kwargs):
        """Save singleton, always with primary key = 1"""
        self.pk = 1
        super().save(*args, **kwargs)
        self.set_cache()

    def delete(self, *args, **kwargs):
        """Not supported / not deletable.
        :return None
        """
        pass

    def set_cache(self):
        """Uses django cache to store this instance by its class name."""
        cache.set(self.__class__.__name__, self)

    def __str__(self):
        """:return verbose_name if verbose_name exist in Meta class, else the type name"""
        # probably not translate
        if hasattr(self._meta, 'verbose_name'):
            return self._meta.verbose_name
        else:
            return type(self).__name__
