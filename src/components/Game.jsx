import React, { Component } from 'react';
import { connect } from 'react-redux';
import {USER_MOVE, RESET_GAME} from '../constants/actionTypes';
import socket from '../io';
import Table from './Table';
import Btn from './Button';

const mapStateToProps = state => ({
    table: state.game.table
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

    showWinner(table) {
        const { currentMove } = this.props;
        const previousMove = currentMove === 'X' ? 'Y' : 'X';

        const XO_Rows = table.reduce((acc, cell) => {
            acc[parseInt(cell.id[0]) - 1].push(cell);
            return acc;
        }, [[], [], []]);

        const XO_Columns = table.reduce((acc, cell) => {
            acc[parseInt(cell.id[1]) - 1].push(cell);
            return acc;
        }, [[], [], []]);

        let XO_Diagonals = [
            ['11', '22', '33'],
            ['31', '22', '13']
        ];
        
        XO_Diagonals = XO_Diagonals.map(d => d.map(c => table.find(cell => cell.id === c)));


        const checkSameValue = (result, cell) => {
            return cell.value === result ? cell.value : false; 
        };

        const isUserWinner = (rows, cols, diagonals) => rows.some(row => row.reduce(checkSameValue, row[0].value)) ||
            cols.some(col => col.reduce(checkSameValue, col[0].value)) ||
            diagonals.some(diagon => diagon.reduce(checkSameValue, diagon[0].value));


        return isUserWinner(XO_Rows, XO_Columns, XO_Diagonals) ? `The player ${previousMove} has won!` : null;
    }

    render() {
        const { table, resetGame } = this.props;
        const winner = this.showWinner(table);

        return (
            <div className="game_zone">
                <div className="header_game">{winner}</div>
                <Table />
                {winner ? <Btn onClick={resetGame} /> : ''}
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);