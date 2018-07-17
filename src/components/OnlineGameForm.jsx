import React, { Component } from 'react';
import socket from '../io';
import { SET_PLAYER_NAME } from '../constants/actionTypes';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    setPlayerName: (playerName) => {
        dispatch({
            type: SET_PLAYER_NAME,
            playerName
        })
    }
});


class OnlineGameForm extends Component {

    constructor(props) {
        super(props);
    
        this.state = { playerName: '' }
    }
    

    handleChange(event) {
        console.log(event.target.value);
        this.setState({ playerName: event.target.value })
    }
    
    searchOpponent() {
        this.props.setPlayerName(this.state.playerName);
        socket.emit('searching', this.state.playerName);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.playerName}
                        onChange={this.handleChange.bind(this)} />
                <button onClick={this.searchOpponent.bind(this)}> Play online! </button>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(OnlineGameForm);