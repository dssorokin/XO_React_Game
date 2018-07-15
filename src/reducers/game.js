import { USER_MOVE, RESET_GAME } from '../constants/actionTypes';

const initState = {
    table: [{id: '11', value: null}, {id: '12', value: null}, {id: '13', value: null},
            {id: '21', value: null}, {id: '22', value: null}, {id: '23', value: null},
            {id: '31', value: null}, {id: '32', value: null}, {id: '33', value: null}],
    currentMove: 'X'
};

export default (state = initState, action) => {
    let { table, currentMove } = state;
    switch (action.type) {
        case USER_MOVE:
            table = table.map(cell => action.id === cell.id ? {id: cell.id, value: currentMove} : cell);     
            return {
                table,
                currentMove: currentMove === 'X' ? 'O' : 'X'
            };
        case RESET_GAME:
            return initState;
    }

    return state;
}

export {initState};