import reducer, {initState} from './game';
import { USER_MOVE, RESET_GAME } from '../constants/actionTypes';
// import * as types from '../actions/posts/getPostsReduxAction';

describe('game reducer', () => {
  it('should return initial state', () => {
      expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle X user move', () => {
    const stateBefore = {
        table: [{id: '11', value: null}, {id: '12', value: null}, {id: '13', value: null},
            {id: '21', value: 'O'}, {id: '22', value: 'X'}, {id: '23', value: null},
            {id: '31', value: null}, {id: '32', value: null}, {id: '33', value: null}],
        currentMove: 'X'
    };

    const action = {
        type: USER_MOVE,
        id: '23'
    };

      const stateAfter = {
          table: [{id: '11', value: null}, {id: '12', value: null}, {id: '13', value: null},
              {id: '21', value: 'O'}, {id: '22', value: 'X'}, {id: '23', value: 'X'},
              {id: '31', value: null}, {id: '32', value: null}, {id: '33', value: null}],
          currentMove: 'O'
      };
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle O user move', () => {
    const stateBefore = {
        table: [{id: '11', value: null}, {id: '12', value: null}, {id: '13', value: null},
            {id: '21', value: 'O'}, {id: '22', value: 'X'}, {id: '23', value: null},
            {id: '31', value: null}, {id: '32', value: null}, {id: '33', value: null}],
        currentMove: 'O'
    };

    const action = {
        type: USER_MOVE,
        id: '11'
    };

    const stateAfter = {
        table: [{id: '11', value: 'O'}, {id: '12', value: null}, {id: '13', value: null},
            {id: '21', value: 'O'}, {id: '22', value: 'X'}, {id: '23', value: null},
            {id: '31', value: null}, {id: '32', value: null}, {id: '33', value: null}],
        currentMove: 'X'
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should detect winner', () => {
    const stateBefore = {
        table: [{id: '11', value: 'X'}, {id: '12', value: null}, {id: '13', value: null},
            {id: '21', value: 'O'}, {id: '22', value: 'X'}, {id: '23', value: null},
            {id: '31', value: null}, {id: '32', value: null}, {id: '33', value: null}],
        currentMove: 'X'
    };

    const action = {
        type: USER_MOVE,
        id: '33'
    };

    expect(reducer(stateBefore, action).winner).toEqual('X');
  });

  it('shoudldnt change state if game has winner', () => {
    const stateBefore = {
        table: [{id: '11', value: null}, {id: '12', value: null}, {id: '13', value: null},
            {id: '21', value: 'O'}, {id: '22', value: 'O'}, {id: '23', value: 'O'},
            {id: '31', value: null}, {id: '32', value: null}, {id: '33', value: null}],
        winner: 'O'
    };

    const action = {
        type: USER_MOVE,
        id: '33'
    };

    expect(reducer(stateBefore, action)).toEqual(stateBefore);
  });

  it('should detect draw', () => {
    const stateBefore = {
        table: [{id: '11', value: 'X'}, {id: '12', value: 'O'}, {id: '13', value: 'O'},
            {id: '21', value: 'O'}, {id: '22', value: 'X'}, {id: '23', value: 'X'},
            {id: '31', value: 'X'}, {id: '32', value: null}, {id: '33', value: 'O'}],
        currentMove: 'O'
    };

    const action = {
        type: USER_MOVE,
        id: '32'
    }

    expect(reducer(stateBefore, action).isDraw).toBeTruthy();
  });

});
