from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ()
    email = models.EmailField('email address', unique=True)

    class Meta:
        db_table = 'auth_user'
