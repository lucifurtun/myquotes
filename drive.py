from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

from googleapiclient.http import MediaFileUpload

SCOPES = ['https://www.googleapis.com/auth/drive.file']


def main():
    """Shows basic usage of the Drive v3 API.
    Prints the names and ids of the first 10 files the user has access to.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=8000)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('drive', 'v3', credentials=creds)

    file_metadata = {
        'name': 'db.dump',
        'parents': ('1h-5yWWISEOBbc9l-kNZrTiGCwxP0oj-Y',)
    }
    media = MediaFileUpload('db.dump', mimetype='application/octet-stream')
    # file = service.files().create(
    #     body=file_metadata,
    #     media_body=media
    # ).execute()

    file = service.files().update(
        fileId='1NS6UAJzKM4QuHfVDLdbD7yJI41YGWZTa',
        media_body=media
    ).execute()

    print('File ID: ', file['id'])


if __name__ == '__main__':
    main()
