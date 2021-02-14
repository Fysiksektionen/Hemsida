from __future__ import annotations
from typing import ClassVar

from django.db import models


class SingletonModel(models.Model):
    """
    An abstract singleton setup for a model.
    """

    # Using 'django.core.cache.cache' doesn't work nicely for this intent.
    # Cache to store the instance of the singleton. Reduces database calls.
    _cached_instance : ClassVar[SingletonModel] = None # DO NOT ACCESS THIS ONE!  use instance()
    # Primary key to find object in database, leave constant.
    _singleton_pk : ClassVar[int] = 1 # should be the same value as the migration creating the objects

    # Using a 'metaclass' doesn't work. So don't refactor it using that.
    # Makes sure there is only one instance.
    def __new__(cls, *args, **kwargs):
        """Creates this singleton if it hasn't been created already.
        :raise TypeError if attempt to create second instance"""
        # Ugly way to check for database access. Another way would be to inspect stack, that is more resilient but still ugly and arbitrary.
        if (len(args) > 0 and args[0] == cls._singleton_pk):
            # Nessesary, because the database doesn't cache already created instances. It tries to create new every time.
            if cls._cached_instance is None:
                return super().__new__(cls).set_cache() # creates this singleton and caches it.
            else:
                return cls._cached_instance
        else:
            raise TypeError("Cannot create more than one instance of a singleton!")  # this is a singleton, can't create objects of this class. Only exist in database

    @classmethod
    def instance(cls) -> SingletonModel: # Generics not implemented in python 3.8, this will do
        """Gets the instance of this singleton"""
        # If DoesNotExist error then your database doesn't contain this singleton!
        #  then the migration have gone wrong!
        # cache is set automatically
        return cls.objects.get(pk=cls._singleton_pk) if cls._cached_instance is None else cls._cached_instance


    class Meta:
        abstract = True

    def save(self, *args, **kwargs) -> None:
        """Save singleton to database"""
        self.pk = self._singleton_pk
        super().save(*args, **kwargs)
        #self.set_cache() probably not needed

    def delete(self, *args, **kwargs) -> None:
        """Not supported / not deletable.
        :return None
        """
        pass

    def set_cache(self) -> SingletonModel: # Generics not implemented in python 3.8, this will do
        """Uses a cache to store this instance by its class.
        :return self"""
        type(self)._cached_instance = self
        return self

    def __str__(self) -> str:
        """:return verbose_name if verbose_name exist in Meta class, else the type name"""
        # probably not translate
        if hasattr(self._meta, 'verbose_name'):
            return self._meta.verbose_name
        else:
            return type(self).__name__

