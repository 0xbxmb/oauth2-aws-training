import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

class Chart extends React.Component {
    render() {
        const items = this.props.items || [];
        return (
            <div>
                <BarChart width={700} height={400}
                          data={items} margin={{top: 50, right: 30, left: 0, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Bar dataKey="value" fill="#0072c6"/>
                </BarChart>
            </div>);
    }
}

export default Chart;
