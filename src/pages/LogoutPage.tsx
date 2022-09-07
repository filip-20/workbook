import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

function LogoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout())
    navigate('/');
  }, [dispatch, navigate])

  return (
    <Container>logout</Container>
  )
}

export default LogoutPage;