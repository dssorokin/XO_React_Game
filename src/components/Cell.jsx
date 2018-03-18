import React from 'react';

const Cell = props => {
    const cellInfo = props.cell;
    const onClick = props.onClick;

    return (
        <div className="cell" onClick={() => cellInfo.value ? null : onClick(cellInfo)}>
            {cellInfo.value ? cellInfo.value : ''}
        </div>
    );
};

export default Cell;