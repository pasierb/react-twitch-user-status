import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './TwitchUserStatus.css';
import twitchLogo from './twitch.svg';
import eyeIcon from './eye.svg';
import gamepadIcon from './gamepad.svg';

function TwitchStreamViewers(props) {
  return (
    <span className="twitch-stream-viewers">
      <i className="icon">
        <img src={eyeIcon} alt="viewers" />
      </i>
      {props.stream.viewers}
    </span>
  );
}

function TwitchStreamPreview(props) {
  return (
    <a href={props.link} className="twitch-stream-preview">
      <img src={props.stream.preview.medium} alt={props.stream.game} />
    </a>
  );
}

function TwitchStreamGame(props) {
  return (
    <span className="twitch-stream-game">
      <i className="icon">
        <img src={gamepadIcon} alt="game" />
      </i>
      {props.stream.game}
    </span>
  );
}

function TwitchUser(props) {
  return (
    <span className="twitch-username">
      <i className="icon"><img src={twitchLogo} alt="twitch logo"/></i>
      <a href={props.link}>{props.username}</a>
    </span>
  );
}

export default class TwitchUserStatus extends Component {
  static propTypes = {
    /** Twitch user's usrename */
    username: PropTypes.string.isRequired,
    /** 
     * Your twitch app Client ID.
     * @see See [Twitch.tv connections](https://www.twitch.tv/settings/connections)
     *
    * */
    twitchClientId: PropTypes.string.isRequired,
    /** Refresh interval, 0 (default) for no refresh */
    livePoll: PropTypes.number,
    /** */
    showPreview: PropTypes.bool
  };

  static defaultProps = {
    livePoll: 0,
    showPreview: true
  };

  constructor(props) {
    super(props);
    this.state = { status: null };
  }

  render() {
    const stream = this.state.status && this.state.status.stream;
    const twitchUrl = `https://twitch.tv/${this.props.username}`;

    return (
      <div className="twitch-user-status">
        { stream ? (
          <div>
            {this.props.showPreview && (<div className="preview">
              <TwitchStreamPreview stream={stream} link={twitchUrl}/>
            </div>)}
            <div className="user">
              <TwitchUser username={this.props.username} link={twitchUrl}/>: {stream.channel.status}
            </div>
            <div className="details">
              <TwitchStreamGame stream={stream} />
              <TwitchStreamViewers stream={stream} />
            </div>
          </div>
        ) : (
          <span>
            <TwitchUser username={this.props.username} link={twitchUrl}/>: Offline
          </span>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.getStatus();

    if (parseInt(this.props.livePoll) > 0) {
      this.interval = setInterval(() => this.getStatus(), this.props.livePoll);
    }
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  getStatus() {
    $.ajax({
      url: `https://api.twitch.tv/kraken/streams/${this.props.username}`,
      data: {
        "client_id": this.props.twitchClientId
      },
      jsonp: "callback",
      dataType: "jsonp",
      success: data => this.setState({ status: data })
    });
  }
};

