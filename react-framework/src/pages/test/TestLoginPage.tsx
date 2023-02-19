import { saveUserId } from "@/stores/user/userId";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TestLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveUserId(100))
    navigate('/home')
  }, [])
  return (
    <div></div>
  )
}
