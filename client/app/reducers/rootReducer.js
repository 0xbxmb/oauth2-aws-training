import { combineReducers } from 'redux';
import * as types from '../constants/constants';
import util from '../util/util';

const initialState = util.getInitialState();

const filtering = (state, fieldNameCallback, filter)=> {
    let items = {};
    let grouped = {};
    items.original = state.original; //TODO need make copy

    items.original.forEach((item) => {
        const key = fieldNameCallback(item);
        grouped[key] = grouped[key] || [];
        grouped[key].push(item);
    });

    items.filtered = Object.getOwnPropertyNames(grouped).filter(filter).map((name)=> {
        let value = grouped[name].reduce(function (acc, item) {
            return !isNaN(+item.amount) ? +item.amount + acc : acc;
        }, 0);
        return {
            name,
            value: Math.floor(value)
        };
    }).sort(function (a, b) {
        return a.value - b.value
    });

    return items;
};

const parseDate = (str) => {
    let [date, month, year] = str.split("/");
    return new Date(year, month, date);
};

const filterByName = (state) => {
    return filtering(state, (item)=>item.operation, ()=>true);
};

const filterByCategory = (state) => {
    return filtering(state, (item)=>util.getCategory(item), ()=>true);
};

const filterByDate = (state) => {
    let result = filtering(state, (item)=>item.date.trim(), name=> name !== "No Date");
    //result.filtered = filtered.sort((a, b)=>{
    //    return a.value - b.value;
    //});

    result.filtered.sort((item1, item2) => {
        return parseDate(item1.name) - parseDate(item2.name);
    });

    result.filtered.forEach((item) => {
        console.log(parseDate(item.name));
    });

    return result;
};

const updateItems = (state = initialState.items, action) => {
    var items = {};
    switch (action.type) {

        case types.APPLY_FILTER_BY_NAME:
            items = filterByName(state);
            items.filteredBy = types.APPLY_FILTER_BY_NAME;
            break;

        case types.APPLY_FILTER_BY_CATEGORY:
            items = filterByCategory(state);
            items.filteredBy = types.APPLY_FILTER_BY_CATEGORY;

            break;
        case types.APPLY_FILTER_BY_DATE:
            items = filterByDate(state);
            items.filteredBy = types.APPLY_FILTER_BY_DATE;
            break;
        default:
            return state;
    }
    return items;
};

const updateFilerOptions = (state = initialState.options, action) => {
    if (action.type !== types.UPDATE_OPTIONS) return state || initialState;
    return action.payload;
};

export default function createReducer() {
    return combineReducers({
        items: updateItems,
        options: updateFilerOptions
    });
}
