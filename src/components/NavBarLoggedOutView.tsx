import { Button } from 'react-bootstrap';

type NavBarLoggedOutViewProps = {
  onSignupClicked: () => void;
  onLoginClicked: () => void;
};

function NavBarLoggedOutView({
  onSignupClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) {
  return (
    <>
      <Button onClick={onSignupClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Log In</Button>
    </>
  );
}

export default NavBarLoggedOutView;
