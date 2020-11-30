export default function (wrrapedComponent) {
	wrrapedComponent.prototype.T = function (messageId) {
		try {
			let messages = this.props.intl.messages;
			let localizeMessages = messages[messageId];
			return this.props.intl.formatMessage(localizeMessages);
		} catch (e) {
			return messageId;
		}
	};

	return wrrapedComponent;
}