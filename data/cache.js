let cache = {};

export const closedDateCache = {
    get(key) {
        return cache[key];
    },
    set(key, value) {
        cache[key] = value;
    },
    reset() {
        cache = {};
    }
};