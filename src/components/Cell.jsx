import React from 'react';
import PropTypes from 'prop-types';
import socket from '../io';
import { connect } from 'react-redux';
import { USER_MOVE } from '../constants/actionTypes';


const mapDispatchToProps = dispatch => ({
    userMove: (cell, playerName) => {
        socket.emit(USER_MOVE, {
            cellId: cell.id,
            playerName
        });
        dispatch({
            type: USER_MOVE,
            id: cell.id
        })
    }
});


const mapStateToProps = state => ({
    playerName: state.game.playerName
});


export const Cell = props => {
    const cellInfo = props.cell;
    const userMove = props.userMove;
    const playerName = props.playerName;

    if (!cellInfo) return (<div></div>);

    return (
        <div className={"cell cell_" + cellInfo.id} onClick={() => cellInfo.value ? null : userMove(cellInfo, playerName)}>
            {cellInfo.value ? cellInfo.value : ''}
        </div>
    );
};

Cell.propTypes = {
    cell: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);