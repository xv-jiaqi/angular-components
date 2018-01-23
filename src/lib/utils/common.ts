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
