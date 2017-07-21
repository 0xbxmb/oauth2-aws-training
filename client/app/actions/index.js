import * as types from '../constants/constants';

export function applyFiltering(filteringType) {
    return {
        type: filteringType
    };
}

export function updateOptions(payload) {
    return {
        type: types.UPDATE_OPTIONS,
        payload
    };
}
export default {applyFiltering, updateOptions};