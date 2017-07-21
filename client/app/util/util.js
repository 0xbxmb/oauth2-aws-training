import * as constants from '../constants/constants';

export function getDefaultFilteringOptions() {
    return [{
        name: 'Date',
        value: constants.APPLY_FILTER_BY_DATE
    }, {
        name: 'Category',
        value: constants.APPLY_FILTER_BY_CATEGORY
    }, {
        name: 'Name',
        value: constants.APPLY_FILTER_BY_NAME
    }];
}

const operationMapping = {

    'снятие наличных': 'cash-withdraw',
    'перевод на свои счета': 'payments',
    'погашение кредита': 'payments',

    'momo.restaurant': 'food',
    'zaymemsya kofe': 'food',
    'gruzinskaya kuk': 'food',
    'universam semya': 'food',
    'edimdoma': 'food',
    'real': 'food',
    '"lukomore" cafe': 'food',
    'ketch ap burger': 'food',
    'restaurant kuvs': 'food',
    'spar': 'food',
    'mamina shkola': 'food',
    'mcdonalds': 'food',
    'tokyo sushi': 'food',

    'yandex.taxi': 'transport',
    'yandex*taxi': 'transport',
    'uber bv': 'transport',

    'kixbox piter': 'clothes',
    'paypal *itk kit': 'clothes',

    'formula kino ga': 'entertainment',
    'tantsploshchadk': 'entertainment',
    'union bar': 'entertainment',
    'itunes.com/bill': 'entertainment',
    'open\'er festiva': 'entertainment',
    'prostovino': 'entertainment',
    '"dostaevsky 8"': 'entertainment',
    '"dostaevsky 13"': 'entertainment',

    'apteka': 'health',

    'tch.aviakassa.r': 'tickets',
    'aviakassa.ru': 'tickets',
    'kenigauto.com': 'tickets',
    'koleo bilety ko': 'tickets'
};

const getCategory = (item) => {
    return item.operation ? operationMapping[item.operation.trim().toLowerCase()] || 'other' : 'other';
};

const getInitialState = () => {
    return {
        items: {
            original: window.values,
            filtered: [],
            filteredBy: constants.APPLY_FILTER_BY_NAME
        },
        options: getDefaultFilteringOptions()
    };
};

export default {getDefaultFilteringOptions, getCategory, getInitialState};
