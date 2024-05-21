import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toast, ToastContainer } from "react-bootstrap";

function StyledToast({ toast, onClose, delay = 3000 }) {
  return (
    <ToastContainer className='p-3 position-fixed z-1' position='top-end'>
      <Toast
        onClose={onClose}
        show={toast}
        delay={delay}
        autohide
        bg={toast.message ? "success-subtle" : toast.error ? "danger-subtle" : ""}
      >
        <Toast.Body className='d-flex align-items-center gap-3 p-3'>
          {toast.message && <FontAwesomeIcon icon={faCheck} className='text-success fs-3' />}
          {toast.error && <FontAwesomeIcon icon={faXmark} className='text-danger fs-3' />}
          {toast.message || toast.error}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default StyledToast;
