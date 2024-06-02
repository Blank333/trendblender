import { Spinner } from "react-bootstrap";

function StyledLoading({ anim = "grow", size = "sm" }) {
  return (
    <>
      <Spinner animation={anim} size={size} role='status'>
        {/* For accessibility, adding a span on one of the spinners */}
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
      <Spinner animation={anim} size={size} role='status' />
      <Spinner animation={anim} size={size} role='status' />
    </>
  );
}

export default StyledLoading;
