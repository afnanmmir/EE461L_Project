import pytest
from backend.server import createApp

@pytest.fixture
def client():
    '''
    Configures the app for testing

    Sets app config variable ``TESTING`` to ``True``

    :return: App for testing
    '''

    app = createApp()
    client = app.test_client()

    yield client

@pytest.fixture 
def app(mocker):
    mocker.patch("")