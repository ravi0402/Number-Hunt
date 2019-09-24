import React from 'react';
import cx from 'classnames';
import './NumberBlock.css';

class NumberBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        }
    }

    handleClick = () => {
        const {
            number,
            onBlockClick,
            selectedNumber
        } = this.props;

        if (!selectedNumber) return alert('Enter a number first!');

        this.setState({
            collapsed: false
        });
        onBlockClick({ number });
    }

    render() {
        const { number } = this.props;
        const { collapsed } = this.state;

        return (
            <div
                className={cx('block', { 'close': collapsed })}
                onClick={collapsed ? this.handleClick : null}
            >
                {number}
            </div>
        );
    }

}

export default NumberBlock;
