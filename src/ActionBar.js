import { ButtonGroup, Form, InputGroup, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ArrowClockwise, ArrowCounterclockwise, FunnelFill, Github } from "react-bootstrap-icons";
import { noop, TooltipButton } from "./Misc";

// github
export default function ActionBar({
  disableUndo,
  disableRedo,
  onUndo = noop,
  onRedo = noop,
}) {
  return (
    <Navbar
      bg='light' variant='light' fixed='top'
      collapseOnSelect expand='md'
    >
      <Nav>
        <NavDropdown drop='down' title='yakboard'>
          <NavDropdown.Item href='#'>Nothing here yet...</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form inline className='ml-2'>
        <ButtonGroup>
          <TooltipButton
            variant='link' size='sm'
            tooltip='Undo' placement='bottom'
            disabled={disableUndo} onClick={onUndo}
            children={<ArrowCounterclockwise />}
          />
          <TooltipButton
            variant='link' size='sm'
            tooltip='Redo' placement='bottom'
            disabled={disableRedo} onClick={onRedo}
            children={<ArrowClockwise />}
          />
        </ButtonGroup>
      </Form>
      <Form inline className='ml-auto'>
        <InputGroup className='ml-2'>
          <Form.Control type='text' placeholder='Filter' />
          <InputGroup.Append>
            <InputGroup.Text><FunnelFill /></InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <TooltipButton
          href='https://github.com/jeslinmx/yakboard'
          variant='light' size='sm' className='ml-2'
          tooltip='View on GitHub' placement='bottom'
          children={<Github />}
        />
      </Form>
    </Navbar>
  );
}