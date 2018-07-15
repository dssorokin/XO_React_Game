import React, { Component } from 'react';
import { connect } from 'react-redux';
import {USER_MOVE} from '../constants/actionTypes';
import './Table.css';
import Cell from './Cell';

const mapStateToProps = state => ({
    cells: state.game.table,
    currentMove: state.game.currentMove
});


class Table extends Component {
    
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


        const checkSameValue = (result, cell) => {
            return cell.value === result ? cell.value : false; 
        };

        const isUserWinner = (rows, cols) => 
            rows.some(row => row.reduce(checkSameValue, row[0].value)) ||
                cols.some(col => col.reduce(checkSameValue, col[0].value))


        return isUserWinner(XO_Rows, XO_Columns) ? `The player ${previousMove} has won!` : '';
    }

    render() {
        const { cells, winner } = this.props;
        return (
            <div>
                <div className="table_game">
                    {cells.map(cell => <Cell className={"cell_" + cell.id} key={cell.id} cell={cell} />)}
                </div>
            </div>
        );
    }
};

export default connect(mapStateToProps, null)(Table);