import React from 'react';
import { connect } from 'react-redux'

class Filter extends React.Component {
    getOptions() {
        return (this.props && this.props.options) ? this.props.options.map((item)=> {
            return <option key={item.value} value={item.value}>{item.name}</option>;
        }) : [];
    }
    render() {
        return (
            <div>
                <div style={{"display":"inline-block"}}>Group By:</div>
                <select value={this.props.selected} style={{"display":"inline-block"}}
                        onChange={this.props.changeHandler}>
                    {this.getOptions()}
                </select>
            </div>
        );
    }
}

export default Filter;
