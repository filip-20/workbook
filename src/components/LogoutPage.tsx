import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { logout } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

function LogoutPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('logout');
    dispatch(logout())
  }, [])

  return (
    <Container>logout</Container>
  )
}

export default LogoutPage;