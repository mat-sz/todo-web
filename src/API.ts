import Config from './Config';
import * as Models from './types/Models';

let url = Config.url;

function isAuthenticated(json: any) {
    if (json && json.error && json.error.status === 403) {
    }
}

async function tryJson(response: Response) {
    try {
        return await response.json();
    } catch {
        return null;
    }
}

async function http(method: string, action: string, body?: FormData|string) {

    let req = await fetch(url + action, {
        body: body,
        method: method,
        headers: {
            'Authorization': 'Bearer ',
            'Content-Type': typeof body === 'string' ? 'application/json' : null,
            'Accept': 'application/json',
        }
    });

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

export {
    crudIndex,
    crudShow,
    crudStore,
    crudUpdate,
    crudDelete,
}