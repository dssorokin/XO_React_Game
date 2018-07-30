import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {USER_MOVE, RESET_GAME} from '../constants/actionTypes';
import socket from '../io';
import Table from './Table';
import Btn from './Button';
import './Game.css';

const mapStateToProps = state => ({
    winner: state.game.winner,
    isDraw: state.game.isDraw
});

const mapDispatchToProps = dispatch => ({
    resetGame: () => dispatch({
        type: RESET_GAME
    }),
    userMove: cellId => dispatch({
        type: USER_MOVE,
        id: cellId
    })
});

class Game extends Component {

    componentDidMount() {
        socket.on('OPPONENT_MOVE', cellId => {
          console.log('cell id', cellId);
          this.props.userMove(cellId);
        })
    }

    showResult() {
        const { winner, isDraw, resetGame } = this.props;
        let resultBlock;

        if (winner) {
            resultBlock = 
                <Fragment>
                    The player {winner} has won!
                    <Btn onClick={resetGame} />
                </Fragment>;
        } else if (isDraw) {
            resultBlock =
                <Fragment>
                    Draw!
                    <Btn onClick={resetGame} />
                </Fragment>;
        } else {
            resultBlock = null;
        }

        return resultBlock;
    }


    render() {
        const { resetGame, winner, isDraw } = this.props;

        return (
            <div className="game_zone">
                <div className="header_game">
                    {this.showResult()}
                </div>
                <Table />
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);