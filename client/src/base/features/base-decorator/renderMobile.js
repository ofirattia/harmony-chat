import {isMobile} from 'react-device-detect';

const RenderMobile = (/* config */) => (WrappedComponent) => {

	if (WrappedComponent.prototype.renderMobile && isMobile) {
		WrappedComponent.prototype.render = WrappedComponent.prototype.renderMobile;
	}

	return WrappedComponent;
};

export default RenderMobile;
