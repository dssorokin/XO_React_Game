import { USER_MOVE, RESET_GAME, SET_PLAYER_NAME } from '../constants/actionTypes';

const initState = {
    table: [{id: '11', value: null}, {id: '12', value: null}, {id: '13', value: null},
            {id: '21', value: null}, {id: '22', value: null}, {id: '23', value: null},
            {id: '31', value: null}, {id: '32', value: null}, {id: '33', value: null}],
    currentMove: 'X',
    playerName: '',
    winner: null
};

const hasWinner = table => {
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


    return isUserWinner(XO_Rows, XO_Columns, XO_Diagonals);
};

export default (state = initState, action) => {
    let { table, currentMove, winner } = state;
    switch (action.type) {
        case USER_MOVE:
            if (winner) return state;
            
            table = table.map(cell => action.id === cell.id ? {id: cell.id, value: currentMove} : cell);

            if (hasWinner(table)) {
                winner = currentMove;
            } else {
                currentMove = currentMove === 'X' ? 'O' : 'X'; 
            }

            return {
                ...state,
                table,
                winner,
                currentMove
            };
        case SET_PLAYER_NAME:
            return {
                ...state,
                playerName: action.playerName
            }
        case RESET_GAME:
            return initState;
    }

    return state;
}

export {initState};