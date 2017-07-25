import {
    AsyncStorage
} from 'react-native'

function stringifyValue(value){
  return JSON.stringify(value===undefined?"":value);
}

function getValueFromString(string){
  return JSON.parse(string);
}

export default class Storage {

    load(key) {
        return new Promise(function (resolve, reject) {
            AsyncStorage.getItem(key, function (error, result) {
                if (error) {
                    reject();
                }
                else {
                    resolve(getValueFromString(result));
                }
            });
        });
    }

    multiLoad(key) {
        return new Promise(function (resolve, reject) {
            AsyncStorage.multiGet(key, function (errors, results) {
                let res = {};
                if (results) {
                    results.forEach(function (result) {
                        res[result[0]] = getValueFromString(result[1]);
                    });
                }
                if (errors) {
                    errors.forEach(function (error) {
                        res[error[0]] = null;
                    });
                }
                resolve(res);
            });
        });
    }

    multiSave(key_value) {
        return new Promise(function (resolve, reject) {
            let arr = [];
            for (let key in key_value) {
                arr.push([key, stringifyValue(key_value[key])]);
            }
            AsyncStorage.multiSet(arr, function (errors) {
                let res = key_value;
                if (errors) {
                    errors.forEach(function (error) {
                        res[error[0]] = null;
                    });
                }
                resolve(res);
            })
        });
    }

    multiRemove(key) {
        return new Promise(function (resolve, reject) {
            AsyncStorage.multiRemove(key, function (errors) {
                let res = {};
                key.forEach(function (k) {
                    res[k] = true;
                });
                if(errors){
                    errors.forEach(function (error) {
                        res[error[0]] = null;
                    });
                }
                resolve(res);
            })
        });
    }

    save(key, value) {
        return new Promise(function (resolve, reject) {
            AsyncStorage.setItem(key, stringifyValue(value), function (error) {
                if (error) {
                    reject();
                }
                else {
                    resolve({key:value});
                }
            })
        });
    }

    clearMap() {
        return new Promise(function (resolve, reject) {
            AsyncStorage.clear(function (error) {
                if (error) {
                    reject();
                }
                else {
                    resolve(true);
                }
            })
        })
    }

    remove(key) {
        return new Promise(function (resovle, reject) {
            AsyncStorage.removeItem(key, function (error) {
                if (error) {
                    reject();
                }
                else {
                    resovle(key);
                }
            });
        });
    }

}
