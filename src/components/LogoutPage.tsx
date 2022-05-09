import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

function LogoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('logout');
    dispatch(logout())
    navigate('/');
  }, [])

  return (
    <Container>logout</Container>
  )
}

export default LogoutPage;