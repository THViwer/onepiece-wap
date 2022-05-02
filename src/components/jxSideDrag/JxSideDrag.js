import React from "react";
import {observer} from "mobx-react";
import Hammer from "react-hammerjs";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";

class DragView extends React.Component {
  render() {
    let { children, initDomInfo } = this.props;
    return <div ref={initDomInfo}>{children}</div>;
  }
}

@observer
class JxSideDrag extends React.Component {
  element;

  startLeft;
  startTop;

  domMaxLeft;
  domMaxTop;
  domMinTop;

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
    }
    this.initDomMoveInfo();
  };

  initDomMoveInfo = throttle(() => {
    if (this.element) {
      const {
        startLeftPercent,
        startTopPercent,
        domMinBottom,
        domMinTop
      } = this.props;
      let moveDomRect = this.element.getBoundingClientRect();
      this.domMaxLeft = window.innerWidth - moveDomRect.width;
      this.domMinTop = domMinTop;
      this.domMaxTop = window.innerHeight - moveDomRect.height - domMinBottom;
      this.startLeft = startLeftPercent * this.domMaxLeft;
      this.startTop = startTopPercent * this.domMaxTop;
      this.element.style.left = `${this.startLeft}px`;
      this.element.style.top = `${this.startTop}px`;
    }
  }, 1000);

  onPanEnd = () => {
    const { dragEndAction } = this.props;
    let moveDomRect = this.element.getBoundingClientRect();
    this.startLeft = moveDomRect.left;
    this.startTop = moveDomRect.top;
    let xPosition = "left";
    if (moveDomRect.left > window.innerWidth * 0.5) {
      this.startLeft = this.domMaxLeft;
      this.element.style.left = `${this.domMaxLeft}px`;
      xPosition = "right";
    } else {
      this.startLeft = 0;
      this.element.style.left = `0px`;
    }
    dragEndAction(this.startTop, this.startLeft, xPosition);
  };

  onPan = event => {
    let domLeft = event.deltaX + this.startLeft;
    let domTop = event.deltaY + this.startTop;
    if (domLeft >= 0 && domLeft <= this.domMaxLeft) {
      this.element.style.left = `${domLeft}px`;
    }
    if (domTop >= this.domMinTop && domTop <= this.domMaxTop) {
      this.element.style.top = `${domTop}px`;
    }
    event.preventDefault(); //解决safari链接滚动
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.viewState !== this.props.viewState) {
      this.initDomMoveInfo();
    }
  }

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

JxSideDrag.defaultProps = {
  startLeftPercent: 0,
  startTopPercent: 0,
  domMinTop: 0,
  domMinBottom: 0,
  onTap: function() {},
  dragEndAction: function() {}
};

JxSideDrag.propTypes = {
  startLeftPercent: PropTypes.number,
  startTopPercent: PropTypes.number,
  domMinTop: PropTypes.number,
  domMinBottom: PropTypes.number,
  className: PropTypes.string,
  onTap: PropTypes.func,
  viewState: PropTypes.string,
  dragEndAction: PropTypes.func
};

export default JxSideDrag;
