import { ReactNode } from "react";
import {
  TUser,
  logOut,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role?: string | undefined;
};

function ProtectedRoute({ children, role }: TProtectedRoute) {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  const user = verifyToken(token) as TUser;

  if (role != undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

export default ProtectedRoute;
