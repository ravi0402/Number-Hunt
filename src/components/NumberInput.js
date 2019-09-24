import React from 'react';
import './NumberInput.css';

class NumberBlock extends React.Component {
    handleChange = (event) => {
        const selectedNumber = event.target.value;
        this.props.onChange({ selectedNumber });
        this.setState({
            selectedNumber: event.target.value
        })
    }

    render() {
        return (
            <input
                className='input'
                placeholder='Enter the number you want to hunt...'
                onChange={this.handleChange}
                value={this.props.selectedNumber}
            />
        );
    }
}

export default NumberBlock;
