import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from '../../redux/reducers'
import * as sagas from '../../redux/reduxSagas'
// import { sagaMonitor, reactotron } from '../../../reactotron-config'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [],
  whitelist: ['loggedInUser'] //persisted reducers
}

/* boolean if environment is dev then true otherwise false */
const isDevEnvironment = process.env.NODE_ENV === 'development'

/* create a saga middleware depends on environment */
// const sagaMiddleware = isDevEnvironment ? createSagaMiddleware({ sagaMonitor }) : createSagaMiddleware()
const sagaMiddleware = createSagaMiddleware()

/* create an enhancer using reactotron for debugging */
// const enhancers = isDevEnvironment && reactotron?.createEnhancer ? [reactotron.createEnhancer()] : []

/* configuring store with reducer, middleware, devTools enable and enhancers */
const store = configureStore({
  reducer: persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
  devTools: isDevEnvironment,
  // enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(enhancers)
})

const persistor = persistStore(store)

/* run the saga middleware with root saga*/
sagaMiddleware.run(sagas.default)

export { persistor, store }
