import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

const newStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducers,
        applyMiddleware(sagaMiddleware),
    );

    sagaMiddleware.run(sagas);

    return store;
};

export default newStore;
module.exports = newStore;