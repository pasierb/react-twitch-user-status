import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

const twitchColor = {
  color: '#4b367c'
}

function TwitchStreamViewers(props) {
  return (
    <span className="twitch-stream-viewers">
      <i className="icon fa fa-eye"></i>
      {props.stream.viewers}
    </span>
  );
}

function TwitchStreamPreview(props) {
  return (
    <a href={props.link} className="twitch-stream-preview" style={{padding: 0}}>
      <img src={props.stream.preview.medium} alt={props.stream.game} />
    </a>
  );
}

function TwitchStreamGame(props) {
  return (
    <span className="twitch-stream-game" style={props.style}>
      <i className="icon fa fa-gamepad"></i>
      {props.stream.game}
    </span>
  );
}

function TwitchUser(props) {
  return (
    <span className="twitch-username">
      <i className="icon fa fa-twitch" style={twitchColor}></i>
      <a href={props.link} style={{display: 'inline', padding: 0, ...twitchColor}}>{props.username}</a>
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
    showPreview: PropTypes.bool,
    showOffline: PropTypes.bool
  };

  static defaultProps = {
    livePoll: 0,
    showPreview: true,
    showOffline: true
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
              <TwitchStreamGame stream={stream} style={{marginRight: '10px'}}/>
              <TwitchStreamViewers stream={stream} />
            </div>
          </div>
        ) : this.props.showOffline && (
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

