import React from 'react';
import renderer from 'react-test-renderer';

import { Cell }  from './Cell';

describe('Cell test', () => {
    
    it('renders correctly empty cell', () => {
        const cellInfo = {
            id: '12',
            value: null
        };
        
        const tree = renderer.create(<Cell cell={cellInfo} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly with X value', () => {
        const cellInfo = {
            id: '12',
            value: 'X'
        };
        
        const tree = renderer.create(<Cell cell={cellInfo} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});