import { createRef, useState } from "react";
import { Button, ButtonGroup, Overlay, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";

let noop = () => {};

function TooltipButton({
  placement, // the OverlayTrigger receives these attributes pertaining to overlays
  tooltip,
  delay,
  trigger,
  transition = false, // https://github.com/react-bootstrap/react-bootstrap/issues/5519
  children, // the children are placed in the Button
  ...restProps // all other attributes are set on the Button
}) {
  return (
    <OverlayTrigger
      placement={placement} delay={delay} trigger={trigger} transition={transition}
      overlay={<Tooltip>{tooltip}</Tooltip>}
    >
      {({ref, ...triggerHandler}) => (
          <Button ref={ref} {...triggerHandler} {...restProps}>{children}</Button>
      )}
    </OverlayTrigger>
  );
}

function MoreActionsButton({
  children,
  buttonChildren = <ThreeDotsVertical />,
  ...restProps
}) {
  // states
  let [show, setShow] = useState(false);
  // refs
  let buttonRef = createRef();
  let popoverRef = createRef();
  // handlers
  let handleBlur = (e) => {
    if (
      show
      && !buttonRef.current.contains(e.relatedTarget)
      && !popoverRef.current.contains(e.relatedTarget)
    ) {
      setShow(false);
    }
  }

  // popovers don't appear as children of whatever they are children of, so:
  // a simple OverlayTrigger with onBlur doesn't work; OverlayTriggers aren't elements, so do not process onBlur
  // a div with onBlur surrounding an OverlayTrigger doesn't work; e.currentTarget does not contain the popover
  // manually creating a Button and an Overlay as siblings and putting onBlur on both doesn't work; the Overlay does not contain the popover
  // putting the onBlur on the Popover doesn't work; it's a function component
  // putting it on a div inside the Popover works though.

  return (
    <>
      <Button
        onBlur={handleBlur} onClick={() => setShow(!show)}
        ref={buttonRef}
        {...restProps}
      >
        {buttonChildren}
      </Button>
      <Overlay
        show={show} placement="left" transition={false}
        target={buttonRef}
      >
        <Popover>
          <ButtonGroup onBlur={handleBlur} ref={popoverRef}>
            {children}
          </ButtonGroup>
        </Popover>
      </Overlay>
    </>
  );
}

export {noop, TooltipButton, MoreActionsButton};