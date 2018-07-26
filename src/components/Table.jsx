import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Table.css';
import Cell from './Cell';

const mapStateToProps = state => ({
    cells: state.game.table,
    currentMove: state.game.currentMove,
    winner: state.game.winner
});

const highlightCell = cell => {
    let cellNew = { ...cell };
    cellNew.isHighlighted = true;
    return cellNew;
}


class Table extends Component {
    
    getHighlightedTable(table) {
        const { winner } = this.props;
        if (!winner) return table;

        let direction;

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

        
        
        if (XO_Rows.some(row => row.reduce(checkSameValue, row[0].value))) {
            direction = XO_Rows.filter(row => row.reduce(checkSameValue, row[0].value))
        } else if (XO_Columns.some(column => column.reduce(checkSameValue, column[0].value))) {
            direction = XO_Columns.filter(column => column.reduce(checkSameValue, column[0].value))
        } else if (XO_Diagonals.some(diagon => diagon.reduce(checkSameValue, diagon[0].value))) {
            direction = XO_Diagonals.filter(diagon => diagon.reduce(checkSameValue, diagon[0].value))
        }

        direction = direction[0].map(highlightCell);

        return table.map(cell =>
            direction.find(dir => dir.id === cell.id) ?
            direction.find(dir => dir.id === cell.id) : cell
        );
    }

    render() {
        const { cells, winner } = this.props;
        const highlightedTable = this.getHighlightedTable(cells);
        
        return (
            <Fragment>
                <div className="table_game">
                    {highlightedTable.map(cell => <Cell key={cell.id} cell={cell} />)}
                </div>
            </Fragment>
        );
    }
};

export default connect(mapStateToProps, null)(Table);