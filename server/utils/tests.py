import uuid

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError, NON_FIELD_ERRORS
from django.db import connection, reset_queries
from django.test import TestCase


class ValidationTestCase(TestCase):
    def assertRaisesValidationError(self, err, field, exclusive, func, *args, **kwargs):
        """Method to assert that the correct ValidationError is thrown.
        :param err: Message to be thrown (str or ValidationError with only one message).
                    If None, no message content validation will be done.
        :param field: Field for error to be thrown. If None, no field association. If '__any__', any field is accepted.
        :param exclusive: Boolean if the error should be exclusive.
        :param func: Function to throw errors.
        :param args: Positional arguments to :arg:func.
        :param kwargs: Named arguments to :arg:func.
        :raises AssertionError if any rule is not met.
        """

        # Get error message
        try:
            func(*args, **kwargs)
        except ValidationError as e:
            error = e
        else:
            raise self.failureException("{} not raised by {}".format(ValidationError.__name__, func.__name__))

        # If ValidationError or string was given as message, convert to message. Else throw error.
        if isinstance(err, ValidationError):
            if len(err.messages) == 0:
                msg = None
            elif len(err.messages) == 1:
                if err.params is None:
                    msg = str(err.message)
                else:
                    msg = str(err.message % err.params)
            else:
                raise ValueError("ValidationError can only have one message.")
        else:
            msg = str(err)

        # If message is not None.
        if msg is not None:
            # If field is None, look for error in error.message or in error[NON_FIELD_ERRORS]
            if field is None:
                if hasattr(error, 'message'):
                    if error.message != msg:
                        raise self.failureException(
                            "Wrong message: '%s' is not equal to '%s'." % (error.message, msg)
                        )
                else:
                    if NON_FIELD_ERRORS not in error.error_dict:
                        raise self.failureException(
                            "Wrong message: key '%s' not found in error '%s'." % (NON_FIELD_ERRORS, error.message_dict)
                        )
                    else:
                        if msg not in error.message_dict[NON_FIELD_ERRORS]:
                            raise self.failureException(
                                "Wrong message: '%s' not found in correct field of error '%s'." % (
                                    msg, error.message_dict
                                )
                            )
                        else:
                            # If exclusive and multiple errors thrown, throw.
                            if exclusive and len(error.messages) != 1:
                                raise self.failureException(
                                    "Wrong message: '%s' not exclusive in error '%s'." % (msg, error.message_dict)
                                )

            # If any field is accepted. check for error in any field or in error.message.
            elif field == "__any__":
                # If errors are not in a dictionary (only one message) and messages do not match.
                if hasattr(error, 'message') and error.message != msg:
                    raise self.failureException(
                        "Wrong message: '%s' is not equal to '%s'." % (error.message, msg)
                    )
                else:
                    # If not exclusive, check that desired message is in errors.
                    if not exclusive:
                        if msg not in error.messages:
                            raise self.failureException(
                                "Wrong message: '%s' not found in error '%s'." % (msg, error.message_dict)
                            )
                    # If exclusive, check for message and no other messages.
                    else:
                        if len(error.messages) != 1 and msg in error.messages:
                            raise self.failureException(
                                "Wrong message: '%s' not exclusive in error '%s'." % (msg, error.message_dict)
                            )
                        elif msg not in error.messages:
                            raise self.failureException(
                                "Wrong message: '%s' not found in error '%s'." % (msg, error.message_dict)
                            )
            # Field has field value.
            else:
                # If field is not found in dictionary. Throw.
                if field not in error.error_dict:
                    raise self.failureException(
                        "Wrong message: '%s' field not found in error '%s'." % (field, error.message_dict)
                    )
                else:
                    # If error not found in field-errors.
                    if msg not in error.message_dict[field]:
                        raise self.failureException(
                            "Wrong message: '%s' not found in field '%s' of error '%s'." % (msg, field, error.message_dict)
                        )
                    else:
                        # If exclusive, check that ony one message is thrown.
                        if exclusive and len(error.messages) != 1:
                            raise self.failureException(
                                "Wrong message: '%s' not exclusive in error '%s'." % (msg, error.message_dict)
                            )

        # If msg is None.
        else:
            # If field is not None, check that error is raised for field.
            if field is not None:
                if hasattr(error, 'message') or field not in error.error_dict:
                    raise self.failureException(
                        "Wrong message: field '%s' not found in error '%s'." % (field, error.message_dict)
                    )
                else:
                    # If found, but exclusive and more errors found.
                    if exclusive and len(error.error_dict) != 1:
                        raise self.failureException(
                            "Wrong message: field '%s' not exclusive in error '%s'." % (field, error.message_dict)
                        )


def num_queries(reset=True):
    """Returns number of queries since last reset.
    Note that evaluation order of num_queries() and other is important!

    :parameter bool reset: Should reset on queries be made. (default: True)
    """
    num = len(connection.queries)
    if reset:
        reset_queries()

    return num


def create_test_user(**kwargs):
    """Helper method to create users for testing.

    Any user attribute can be given in kwargs to override default values.

    :raises `ValidationError` if any of the kwargs are invalid as parameters to the User
    :raises `TypeError` if any of the kwargs are not valid in `__init__` of the User model.

    :return User object already saved in the database.
    """
    User = get_user_model()

    # If username is not specified, generate a random on the form "test_[random string]".
    username = kwargs.pop('username', None)
    if username is None:
        usernames = User.objects.all().values_list('username', flat=True)
        while username is None or username in usernames:
            username = "test_" + str(uuid.uuid4())

    # If email is not specified generate one on the form "[username]@test.se".
    email = kwargs.pop('email', username + "@test.se")

    # Pop password for later use.
    password = kwargs.pop('password', None)

    # Create user instance
    user = User(username=username, email=email, **kwargs)

    # Set password if any, else set unusable.
    if password is not None:
        user.set_password(password)
    else:
        user.set_unusable_password()

    # Clean so that validation error occur if kwargs are invalid.
    user.full_clean()

    # Save user (only reached if no validation errors).
    user.save()

    return user
