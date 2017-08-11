var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsxFileName = 'src/components/TwitchUserStatus.js';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

var twitchColor = {
  color: '#4b367c'
};

function TwitchStreamViewers(props) {
  return React.createElement(
    'span',
    { className: 'twitch-stream-viewers', __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      },
      __self: this
    },
    React.createElement('i', { className: 'icon fa fa-eye', __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: this
    }),
    props.stream.viewers
  );
}

function TwitchStreamPreview(props) {
  return React.createElement(
    'a',
    { href: props.link, className: 'twitch-stream-preview', style: { padding: 0 }, __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    },
    React.createElement('img', { src: props.stream.preview.medium, alt: props.stream.game, __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    })
  );
}

function TwitchStreamGame(props) {
  return React.createElement(
    'span',
    { className: 'twitch-stream-game', style: props.style, __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    },
    React.createElement('i', { className: 'icon fa fa-gamepad', __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }),
    props.stream.game
  );
}

function TwitchUser(props) {
  return React.createElement(
    'span',
    { className: 'twitch-username', __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      },
      __self: this
    },
    React.createElement('i', { className: 'icon fa fa-twitch', style: twitchColor, __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }),
    React.createElement(
      'a',
      { href: props.link, style: Object.assign({ display: 'inline', padding: 0 }, twitchColor), __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      },
      props.username
    )
  );
}

var TwitchUserStatus = function (_Component) {
  _inherits(TwitchUserStatus, _Component);

  function TwitchUserStatus(props) {
    _classCallCheck(this, TwitchUserStatus);

    var _this = _possibleConstructorReturn(this, (TwitchUserStatus.__proto__ || Object.getPrototypeOf(TwitchUserStatus)).call(this, props));

    _this.state = { status: null };
    return _this;
  }

  _createClass(TwitchUserStatus, [{
    key: 'render',
    value: function render() {
      var stream = this.state.status && this.state.status.stream;
      var twitchUrl = 'https://twitch.tv/' + this.props.username;

      return React.createElement(
        'div',
        { className: 'twitch-user-status', __source: {
            fileName: _jsxFileName,
            lineNumber: 77
          },
          __self: this
        },
        stream ? React.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 79
            },
            __self: this
          },
          this.props.showPreview && React.createElement(
            'div',
            { className: 'preview', __source: {
                fileName: _jsxFileName,
                lineNumber: 80
              },
              __self: this
            },
            React.createElement(TwitchStreamPreview, { stream: stream, link: twitchUrl, __source: {
                fileName: _jsxFileName,
                lineNumber: 81
              },
              __self: this
            })
          ),
          React.createElement(
            'div',
            { className: 'user', __source: {
                fileName: _jsxFileName,
                lineNumber: 83
              },
              __self: this
            },
            React.createElement(TwitchUser, { username: this.props.username, link: twitchUrl, __source: {
                fileName: _jsxFileName,
                lineNumber: 84
              },
              __self: this
            }),
            ': ',
            stream.channel.status
          ),
          React.createElement(
            'div',
            { className: 'details', __source: {
                fileName: _jsxFileName,
                lineNumber: 86
              },
              __self: this
            },
            React.createElement(TwitchStreamGame, { stream: stream, style: { marginRight: '10px' }, __source: {
                fileName: _jsxFileName,
                lineNumber: 87
              },
              __self: this
            }),
            React.createElement(TwitchStreamViewers, { stream: stream, __source: {
                fileName: _jsxFileName,
                lineNumber: 88
              },
              __self: this
            })
          )
        ) : this.props.showOffline && React.createElement(
          'span',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 92
            },
            __self: this
          },
          React.createElement(TwitchUser, { username: this.props.username, link: twitchUrl, __source: {
              fileName: _jsxFileName,
              lineNumber: 93
            },
            __self: this
          }),
          ': Offline'
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.getStatus();

      if (parseInt(this.props.livePoll) > 0) {
        this.interval = setInterval(function () {
          return _this2.getStatus();
        }, this.props.livePoll);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.interval && clearInterval(this.interval);
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      var _this3 = this;

      $.ajax({
        url: 'https://api.twitch.tv/kraken/streams/' + this.props.username,
        data: {
          "client_id": this.props.twitchClientId
        },
        jsonp: "callback",
        dataType: "jsonp",
        success: function success(data) {
          return _this3.setState({ status: data });
        }
      });
    }
  }]);

  return TwitchUserStatus;
}(Component);

TwitchUserStatus.propTypes = {
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
TwitchUserStatus.defaultProps = {
  livePoll: 0,
  showPreview: true,
  showOffline: true
};
export default TwitchUserStatus;
;