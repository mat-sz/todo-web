import Config from './Config';
import * as Entities from './types/Entities';
import * as Models from './types/Models';
import { ActionType } from './types/ActionType';
import { StoreType } from './reducers';

let store: StoreType;
let url = Config.url;

function authenticated(token: string, user: Entities.UserEntity) {
    store.dispatch({ type: ActionType.AUTHENTICATED, value: user });
    store.dispatch({ type: ActionType.SET_TOKEN, value: token });
}

function deauthenticated() {
    localStorage.removeItem('token');
    store.dispatch({ type: ActionType.DEAUTHENTICATED });
    store.dispatch({ type: ActionType.SET_TOKEN, value: null });
}

function isAuthenticated(json: any) {
    if (json && json.error && json.error.status === 403) {
        deauthenticated();
    }
}

async function tryJson(response: Response) {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

let activeRequests = 0;
async function http(method: string, action: string, body?: FormData|string) {
    activeRequests++;
    store.dispatch({ type: ActionType.SET_LOADING, value: true });

    let req = await fetch(url + action, {
        body: body,
        method: method,
        headers: {
            'Authorization': 'Bearer ' + store.getState().settings.token,
            'Content-Type': typeof body === 'string' ? 'application/json' : null,
            'Accept': 'application/json',
        }
    });

    activeRequests--;

    if (activeRequests < 0) {
        // Should never happen, but let's protect ourselves against that.
        activeRequests = 0;
    }

    store.dispatch({ type: ActionType.SET_LOADING, value: activeRequests !== 0 });

    return req;
}

async function httpGet(action: string) {
    let req = await http('GET', action);
    
    let json = await tryJson(req);
    isAuthenticated(json);
    return json;
}

async function httpPost(action: string, data: any) {
    let req = await http('POST', action, JSON.stringify(data));

    let json = await tryJson(req);
    isAuthenticated(json);
    return json;
}

async function httpDelete(action: string) {
    let req = await http('DELETE', action);

    let json = await tryJson(req);
    isAuthenticated(json);
    return json;
}

/* Public things here */

/**
 * Get all objects of type.
 * @param {String} type 
 */
async function crudIndex(type: string) {
    return httpGet(type);
}

/**
 * Get more detailed information about an object with a given id.
 * @param {String} type 
 * @param {String|Number} id 
 */
async function crudShow(type: string, id: string|number) {
    return httpGet(type + '/' + id);
}

/**
 * Save an object of a given type.
 * @param {String} type 
 * @param {Object} object 
 */
async function crudStore(type: string, object: any) {
    return httpPost(type, object);
}

/**
 * Update an object. (The object must have an 'id' field)
 * @param {String} type 
 * @param {Object} object 
 */
async function crudUpdate(type: string, object: Models.ObjectModel) {
    return httpPost(type + '/' + object.id, object);
}

/**
 * Delete an object. (The object must have an 'id' field)
 * @param {String} type 
 * @param {Object} object 
 */
async function crudDelete(type: string, object: Models.ObjectModel) {
    return httpDelete(type + '/' + object.id);
}

/* Auth */

/**
 * Retrieves information about the currently logged in user.
 */
async function user(): Promise<Entities.UserEntity> {
    const json = await httpGet('auth');
    if (json) {
        return json;
    } else {
        return null;
    }
}

/**
 * Check whether a saved token is valid.
 * @param {String} value 
 */
async function checkToken(value: string) {
    const json = await user();
    
    if (json) {
        authenticated(value, json);
    } else {
        deauthenticated();
    }

    return json;
}

/**
 * Sets the global store for the API.
 * @param {StoreType} theStore 
 */
function setStore(theStore: StoreType) {
    store = theStore;
    const token = store.getState().settings.token;
    if (token) {
        checkToken(token);
    }
}

export {
    crudIndex,
    crudShow,
    crudStore,
    crudUpdate,
    crudDelete,
    checkToken,
    setStore,
}