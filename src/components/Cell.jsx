import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { USER_MOVE } from '../constants/actionTypes';


const mapDispatchToProps = dispatch => ({
    userMove: cell => dispatch({
        type: USER_MOVE,
        id: cell.id
    })
});


export const Cell = props => {
    const cellInfo = props.cell;
    const onClick = props.userMove;

    if (!cellInfo) return (<div></div>);

    return (
        <div className={"cell cell_" + cellInfo.id} onClick={() => cellInfo.value ? null : userMove(cellInfo)}>
            {cellInfo.value ? cellInfo.value : ''}
        </div>
    );
};

Cell.propTypes = {
    cell: PropTypes.shape({}).isRequired
};

export default connect(null, mapDispatchToProps);