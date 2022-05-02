import React from "react";
import {observer} from "mobx-react";
import Hammer from "react-hammerjs";
import PropTypes from "prop-types";
import platform from "../../utils/platform";

class DragView extends React.Component {
  render() {
    let { children, initDomInfo } = this.props;
    return <div ref={initDomInfo}>{children}</div>;
  }
}

@observer
class JxDrag extends React.Component {
  element;

  startLeft;
  startTop;

  domMaxLeft;
  domMaxTop;

  options = {
    touchAction: "compute",
    recognizers: {
      pan: {
        pointers: 0,
        threshold: 0
      }
    }
  };

  initDomInfo = dom => {
    if (dom) {
      this.element = dom.firstChild;
      let moveDomRect = this.element.getBoundingClientRect();
      this.startLeft = moveDomRect.left;
      this.startTop = moveDomRect.top;
      this.domMaxLeft = window.innerWidth - moveDomRect.width;
      this.domMaxTop = platform.height() - moveDomRect.height - 100;
    }
  };

  onPanEnd = () => {
    let moveDomRect = this.element.getBoundingClientRect();
    this.startLeft = moveDomRect.left;
    this.startTop = moveDomRect.top;
  };

  onPan = event => {
    let domLeft = event.deltaX + this.startLeft;
    let domTop = event.deltaY + this.startTop;
    if (domLeft >= 0 && domLeft <= this.domMaxLeft) {
      this.element.style.left = `${domLeft}px`;
    }
    if (domTop >= 0 && domTop <= this.domMaxTop) {
      this.element.style.top = `${domTop}px`;
    }
    event.preventDefault(); //解决safari链接滚动
  };

  render() {
    let { onTap, children } = this.props;
    return (
      <Hammer
        onTap={onTap}
        onPanCancel={this.onPanEnd}
        onPanEnd={this.onPanEnd}
        onPanStart={this.onPan}
        onPan={this.onPan}
        options={this.options}
      >
        <div>
          <DragView initDomInfo={this.initDomInfo}>{children}</DragView>
        </div>
      </Hammer>
    );
  }
}

JxDrag.defaultProps = {
  onTap: function() {}
};

JxDrag.propTypes = {
  className: PropTypes.string,
  onTap: PropTypes.func
};

export default JxDrag;
