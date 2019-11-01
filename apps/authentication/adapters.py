from allauth.account.adapter import DefaultAccountAdapter


class AccountAdapter(DefaultAccountAdapter):

    def respond_email_verification_sent(self, request, user):
        """ We need to prevent the default behavior from allauth app."""
        pass

    def respond_user_inactive(self, request, user):
        """ We need to prevent the default behavior from allauth app."""
        pass
