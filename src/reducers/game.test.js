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
        currentMove: 'X',
        currentWinner: null
    };

    const action = {
        type: USER_MOVE,
        id: '23'
    };

      const stateAfter = {
          table: [{id: '11', value: null}, {id: '12', value: null}, {id: '13', value: null},
              {id: '21', value: 'O'}, {id: '22', value: 'X'}, {id: '23', value: 'X'},
              {id: '31', value: null}, {id: '32', value: null}, {id: '33', value: null}],
          currentMove: 'O',
          currentWinner: null
      };
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

});
