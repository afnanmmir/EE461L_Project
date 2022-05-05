import pytest
from backend.server import createApp
from backend.database.extensions import mongo

@pytest.fixture(scope="session")
def client():
    '''
    Configures the app for testing

    Sets app config variable ``TESTING`` to ``True``

    :return: App for testing
    '''

    app = createApp(unit_testing=True)  
    client = app.test_client()
    yield client


@pytest.fixture(scope="session")
def database():
    '''
    Provides database instance

    :return: Database instance for testing
    '''

    database = mongo.db
    yield database
