""" Folder of testcases """
from django.core.exceptions import ValidationError, NON_FIELD_ERRORS
from django.test import TestCase


class ValidationTestCase(TestCase):
    def assertRaisesValidationError(self, msg, field, exclusive, func, *args, **kwargs):
        """Method to assert that the correct ValidationError is thrown.
        :param msg: Message to be thrown (str or ValidationError with message without fields).
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

        # If ValidationError was given as message, convert to message. Else throw error.
        if isinstance(msg, ValidationError):
            if hasattr(msg, 'message'):
                if msg.params is None:
                    msg = str(msg.message)
                else:
                    msg = str(msg.message % msg.params)
            else:
                raise ValueError("'msg' can only be string or validation message without dictionary.")


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
