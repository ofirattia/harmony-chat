import React, {Component} from 'react'
import {Launcher} from '../react-chat-window'
import {baseConnect} from "../../base/features/base-redux-react-connect";
import ChatActions from '../../redux/chat';


class Chat extends Component {
    _onMessageWasSent(message) {
        const {sendMessage} = this.props;

        sendMessage(message);
    }

    // PICACHO EXAMPLE
    static renderPicacho(renderPicacho) {
        if (renderPicacho) {
            return (
                <img src="/dist/assets/picacho.webp" alt="" style={{bottom:'1em', position: 'absolute'}} />
            );
        }

    }

    render() {
        const {messageList, renderPicacho} = this.props;
        console.log(this.props);
        return (
            <div>
                {Chat.renderPicacho(renderPicacho)}
                <Launcher
                    agentProfile={{
                        teamName: 'Support',
                        imageUrl: 'data:image/png;base64,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'
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={messageList}
                    showEmoji
                />
            </div>
        );
    }
}

export default baseConnect(Chat,
    (state) => {
        return {
            messageList: state.chat.messageList,
            renderPicacho: state.chat.renderPicacho
        }
    },
    {
        sendMessage: ChatActions.sendMessage
    }
);