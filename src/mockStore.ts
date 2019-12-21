import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureMockStore([ sagaMiddleware ]);

sagaMiddleware.run(sagas);

export default mockStore;