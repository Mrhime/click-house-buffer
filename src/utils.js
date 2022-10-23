export const validateRecord = (data) => {
    if (data) {
        if ('id' in data &&
            'full_name' in data &&
            'description' in data &&
            'tableName' in data) {
            return true
        }
    }
    return false
}

export const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const getTimestamp = () => {
  return Date.now()
}
