import React from 'react';
import despatch from 'redux';
import { connect } from 'react-redux';
import Filter from '../components/Filter';
import Chart from '../components/Chart';
import getStore from '../store/store';
import actions from '../actions/index';
import * as types from '../constants/constants';

const store = getStore();
const filterEvents = (event) => {
    store.dispatch(actions.applyFiltering(event.target.value));
};

class App extends React.Component {
    render() {
        const { options, items } = this.props || {};
        return (
            <div>
                <h1>Filter table</h1>
                <Filter options={options}
                        selected={items.filteredBy}
                        changeHandler={filterEvents}></Filter>
                <Chart items={items.filtered}></Chart>
            </div>
        );
    }
}

const initialFiltering = store.getState().items.filteredBy;
store.dispatch(actions.applyFiltering(initialFiltering));

export default connect((state)=> state)(App);
