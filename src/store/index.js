import {applyMiddleware, createStore} from "redux";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import {persistReducer, persistStore} from "redux-persist";
import allReducer from "../reducer/index";
import thunkMiddleware from 'redux-thunk';

const persistConfig={
    key:'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, allReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware)
);

export const persistor= persistStore(store);

