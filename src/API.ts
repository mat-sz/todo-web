import Config from './Config';
import * as Entities from './types/Entities';
import * as Models from './types/Models';

let token: string;
let url = Config.url;
let handlers: {[index: string]: any[]} = {
    'authenticated': [],
    'deauthenticated': [],
    'error': [],
};

function executeHandlers(eventName: string, args?: any[]) {
    handlers[eventName].forEach((func) => func.apply(null, args));
}

function isAuthenticated(json: any) {
    if (json && json.error && json.error.status === 403) {
        executeHandlers('deauthenticated');
    }
}

async function tryJson(response: Response) {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

async function httpGet(action: string) {
    let req = await fetch(url + action, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
        }
    });
    
    let json = await tryJson(req);
    isAuthenticated(json);
    return json;
}

async function httpPost(action: string, data: any) {
    let req = await fetch(url + action, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

    let json = await tryJson(req);
    isAuthenticated(json);
    return json;
}

async function httpPostForm(action: string, data: any) {
    let formData = new FormData();
    
    if (data) {
        for (let row of Object.keys(data)) {
            if (row === 'key') continue;
            if (typeof data[row] === 'undefined' || data[row] === null) continue;
            formData.append(row, data[row]);
        }
    }

    let req = await fetch(url + action, {
        body: formData,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
        }
    });

    let json = await tryJson(req);
    isAuthenticated(json);
    return json;
}

async function httpDelete(action: string) {
    let req = await fetch(url + action, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json',
        }
    });

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
 * Save an object of a given type. (Supports file uploads.)
 * @param {String} type 
 * @param {Object} object 
 */
async function crudUpload(type: string, object: any) {
    return httpPostForm(type, object);
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
 * Log in.
 * @param {String} username 
 * @param {String} password 
 */
async function authenticate(username: string, password: string) {
    let res: Models.AuthenticationResponseModel = await httpPost('auth', {
        username: username,
        password: password,
    });

    if (!res) return null;

    if (res.success) {
        token = res.token;
        localStorage.setItem('token', token);
        executeHandlers('authenticated', [await user()]);
        return res;
    }

    return res;
}

/**
 * Log out.
 */
function deauthenticate() {
    localStorage.removeItem('token');
    executeHandlers('deauthenticated');
}

/**
 * Register.
 * @param {String} username 
 * @param {String} password 
 */
async function signup(username: string, password: string) {
    let res: Models.GenericResponseModel = await httpPost('auth/signup', {
        username: username,
        password: password,
    });

    if (!res) return null;

    if (res.success) {
        await authenticate(username, password);
    }

    return res;
}

/**
 * Check whether a saved token is valid.
 * @param {String} value 
 */
async function checkToken(value: string) {
    token = value;
    const json = await user();
    
    if (json) {
        executeHandlers('authenticated', [json]);
    } else {
        localStorage.removeItem('token');
        executeHandlers('deauthenticated');
        token = null;
    }

    return json;
}

/**
 * Event handling.
 * @param {String} eventName Events: authenticated, deauthenticated, error.
 * @param {Function} func 
 */
function on(eventName: string, func: Function) {
    if (eventName in handlers) {
        handlers[eventName].push(func);
    }
}

export {
    crudIndex,
    crudShow,
    crudUpload,
    crudStore,
    crudUpdate,
    crudDelete,
    authenticate,
    deauthenticate,
    signup,
    checkToken,
    on,
}