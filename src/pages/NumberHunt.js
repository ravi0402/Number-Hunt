import React, { Fragment, Component } from 'react';
import _ from 'lodash';
import NumberInput from '../components/NumberInput';
import NumberBlock from '../components/NumberBlock';
import './NumberHunt.css';

class NumberHunt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedNumber: '',
            shuffledNumberList: [],
            counter: 3,
            showWinMessage: false,
            showLoseMessage: false,
        }
    }

    componentDidMount() {
        this.startGame();
    }


    handleClick = ({ number }) => {
        const { counter, selectedNumber } = this.state;
        if (number === _.toNumber(selectedNumber)) {
            this.setState({
                showWinMessage: true
            })
        } else if (counter === 1) {
            this.setState({
                showLoseMessage: true
            })
        } else {
            this.setState({
                counter: counter - 1,
            });
        }
    }

    handleChange = ({ selectedNumber }) => {
        this.setState({
            selectedNumber,
        });
    }

    startGame = () => {
        const numberList = _.range(1, 10);
        for (let currentIndex = numberList.length - 1; currentIndex > 0; currentIndex--) {
            const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
            [numberList[currentIndex], numberList[randomIndex]] = [numberList[randomIndex], numberList[currentIndex]];
        }

        this.setState({
            shuffledNumberList: numberList,
            counter: 3,
            selectedNumber: '',
            showWinMessage: false,
            showLoseMessage: false,
        })
    }

    renderMessageNode = () => {
        let messageNode;
        const {
            showWinMessage,
            showLoseMessage,
            selectedNumber
        } = this.state;

        const btnNode = <div onClick={this.startGame} className='playAgain'>Play Again</div>

        switch (true) {
            case showLoseMessage:
                messageNode = (
                    <div className='messageBox'>
                        <div className='error'>Sorry! You Lost!</div>
                        {btnNode}
                    </div>
                )
                break;
            case showWinMessage:
                messageNode = (
                    <div className='messageBox'>
                        <div className='win'>You found {selectedNumber}! Yayy!</div>
                        {btnNode}
                    </div>
                )
                break;
            default:
                messageNode = null;
                break;
        }

        return messageNode;
    }

    render() {

        const {
            selectedNumber,
            shuffledNumberList,
        } = this.state;

        let node = this.renderMessageNode();

        return (
            <div className='wrapper'>

                <div className='title'>Number Hunt</div>
                <div className='gameContainer'>
                    {
                        !node ? (
                            <Fragment>
                                <div className='inputWrapper'>
                                    <div className='label'>Enter Number:</div>
                                    <NumberInput selectedNumber={selectedNumber} onChange={this.handleChange} />
                                </div>
                                <div className='boxContainer'>
                                    {
                                        shuffledNumberList && shuffledNumberList.map((item, index) => {
                                            return (
                                                <NumberBlock
                                                    key={index}
                                                    number={item}
                                                    onBlockClick={this.handleClick}
                                                    selectedNumber={selectedNumber}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </Fragment>
                        ) : (
                                node
                            )
                    }

                </div>
            </div>
        );
    }
}

export default NumberHunt;
