import { createRef, useState } from "react";
import { Button, ButtonGroup, Overlay, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";

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
  return (<OverlayTrigger placement={placement} overlay={<Tooltip>{tooltip}</Tooltip>} delay={delay} trigger={trigger} transition={transition}>
    {({ref, ...triggerHandler}) => (
        <Button ref={ref} {...triggerHandler} {...restProps}>{children}</Button>
    )}
  </OverlayTrigger>);
}

function MoreActionsButton({
  popoverChildren,
  buttonChildren,
  ...restProps
}) {
  let [show, setShow] = useState(false);
  let buttonRef = createRef();
  let popoverRef = createRef();

  function handleBlur(e) {
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
      <Button ref={buttonRef} onBlur={handleBlur} onClick={() => setShow(!show)} {...restProps}>
        {buttonChildren}
      </Button>
      <Overlay target={buttonRef} show={show} placement="right" transition={false}>
        <Popover>
          <ButtonGroup ref={popoverRef} onBlur={handleBlur}>
            {popoverChildren}
          </ButtonGroup>
        </Popover>
      </Overlay>
    </>
  );
}

export {noop, TooltipButton, MoreActionsButton};