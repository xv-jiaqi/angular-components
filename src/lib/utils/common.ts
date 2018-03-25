export function merge (...args) {
  return Object.assign({}, ...args);
}

export function deepMerge (...args) {
  const result = {};
  for (const v of args) {
    for (const key in v) {
      if (typeof v[key] === 'object') {
        if (Array.isArray(v[key])) {
          if (Array.isArray(result[key])) {
            v[key].forEach((vv, index) => {
              if (typeof vv === 'object' && typeof result[key][index] === 'object') {
                result[key][index] = deepMerge(result[key][index], vv);
              } else if (typeof result[key][index] !== 'object') {
                result[key][index] = typeof vv === 'object' ? deepClone(vv) : vv;
              }
            });
          } else {
            result[key] = deepClone(v[key]);
          }
        } else {
          result[key] = deepMerge(result[key], v[key]);
        }
      } else {
        result[key] = v[key];
      }
    }
  }
  return result;
}

export function clone (obj) {
  return Object.assign({}, obj);
}

export function deepClone (source) {
  let result;
  if (Array.isArray(source)) {
    result = [];
    source.forEach(value => {
      if (typeof value === 'object') {
        result.push(deepClone(value));
      } else {
        result.push(value);
      }
    });
  } else {
    result = source === null ? null : {};
    for (const key in source) {
      if (typeof source[key] === 'object') {
        result[key] = deepClone(source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}

export function deepEqual(objA, objB) {
  if ((objA === undefined || objA === null) && (objB === undefined || objB === null)) { return objA === objB; }
  const keysA = Object.getOwnPropertyNames(objA);
  const keysB = Object.getOwnPropertyNames(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (keysB.indexOf(key) === -1) {
      return false;
    }

    if (Object.prototype.toString.call(objA[key]) !== Object.prototype.toString.call(objB[key])) {
      return false;
    }

    if (typeof objA[key] === 'object') {
      if (!this.deepEqual(objA[key], objB[key])) { return false; }
    } else {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
  }

  return true;
}
