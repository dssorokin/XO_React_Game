import React, { Component } from 'react';
import { connect } from 'react-redux';
import {USER_MOVE, RESET_GAME} from '../constants/actionTypes';
import socket from '../io';
import Table from './Table';
import Btn from './Button';
import './Game.css';

const mapStateToProps = state => ({
    table: state.game.table,
    winner: state.game.winner
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


    render() {
        const { table, resetGame, winner } = this.props;

        return (
            <div className="game_zone">
                <div className="header_game">
                    {winner ? `The player ${winner} has won!` : null}
                    {winner ? <Btn onClick={resetGame} /> : ''}
                </div>
                <Table />
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);