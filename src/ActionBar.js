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
            <Form inline>
                <ButtonGroup>
                    <TooltipButton variant='light' placement='bottom' tooltip='Undo' disabled={disableUndo} onClick={onUndo}><ArrowCounterclockwise /></TooltipButton>
                    <TooltipButton variant='light' placement='bottom' tooltip='Redo' disabled={disableRedo} onClick={onRedo}><ArrowClockwise /></TooltipButton>
                </ButtonGroup>
            </Form>
            <Form inline className='ml-auto'>
                <InputGroup className='ml-2'>
                    <Form.Control type='text' placeholder='Filter' />
                    <InputGroup.Append>
                        <InputGroup.Text><FunnelFill /></InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <TooltipButton variant='light' placement='bottom' tooltip='View on GitHub' href='https://github.com/jeslinmx/yakboard' className='ml-2'><Github /></TooltipButton>
            </Form>
        </Navbar>
    );
}