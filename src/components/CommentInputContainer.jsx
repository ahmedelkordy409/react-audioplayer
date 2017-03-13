import React from 'react';
import { Motion, spring } from 'react-motion';
import * as Buttons from './buttons/index';
import ButtonGroup from './ButtonGroup';
import style from '../styles/audioElements.css';

class CommentInputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      inputContent: ''
    };
    this._onClickStartBtn = this._onClickStartBtn.bind(this);
    this._onClickSendBtn = this._onClickSendBtn.bind(this);
    this._onClickCloseBtn = this._onClickCloseBtn.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
  }
  _onClickStartBtn(e) {
    e.stopPropagation();
    this.setState({ showInput: true });
    const input = e.currentTarget.previousSibling.firstChild;
    input.focus();
    input.select();
  }
  _onClickSendBtn(e) {
    e.preventDefault();
    if (this.props.onCommentSubmit) {
      this.props.onCommentSubmit(e, this.state.inputContent);
    }
    this.setState({
      showInput: false,
      inputContent: ''
    });
  }
  _onClickCloseBtn() {
    this.setState({
      showInput: false,
      inputContent: ''
    });
  }
  _onInputChange(e) {
    this.setState({ inputContent: e.target.value });
  }
  render() {
    return (
      <div className={style.commentInputContainer} onClick={(e) => {
        e.stopPropagation();
      }}>
        <Motion style={{
          width: spring(this.state.showInput ? 200 : 0),
          opacity: spring(this.state.showInput ? 1 : 0),
        }}>
          {({width, opacity}) =>
            <form onSubmit={this._onClickSendBtn}>
              <input
                style={{
                  width: `${width}px`,
                  opacity: opacity,
                  borderBottom: `2px solid ${this.context.color}`
                }}
                value={this.state.inputContent}
                onChange={this._onInputChange}
              />
            </form>
          }
        </Motion>
        {
          this.state.showInput ?
            <ButtonGroup>
              <Buttons.CloseBtn onClick={this._onClickCloseBtn} />
              <Buttons.CommentSendBtn onClick={this._onClickSendBtn} />
            </ButtonGroup> :
            <Buttons.CommentStartBtn onClick={this._onClickStartBtn} />
        }
      </div>
    );
  }
};
CommentInputContainer.contextTypes = {
  color: React.PropTypes.string
}

export default CommentInputContainer;
