import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Spinner } from "react-bootstrap";

function StyledModal({ show, onHide, title, body, loading }) {
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Title className='d-flex justify-content-center py-3 gap-1'>
          {loading && (
            <>
              <Spinner animation='grow' size='sm' role='status'>
                {/* For accessibility, adding a span on one of the spinners */}
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
              <Spinner animation='grow' size='sm' role='status' />
              <Spinner animation='grow' size='sm' role='status' />
            </>
          )}
        </Modal.Title>
        {title && (
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        )}
        {body && <Modal.Body>{body}</Modal.Body>}
        <Modal.Footer className='d-flex justify-content-start '>
          <Button className='bg-success-subtle hover-color-custom text-black border-0' onClick={onHide}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StyledModal;
