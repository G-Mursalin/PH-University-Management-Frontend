import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { useLoginMutation } from "../redux/features/auth/authApi";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const defaultValues = {};

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login(data).unwrap();

      // Decode the access Token
      const user = verifyToken(res.data.accessToken) as TUser;

      // Set user to local state
      dispatch(
        setUser({
          user,
          token: res.data.accessToken,
        })
      );

      toast.success("Logged in", { id: toastId });

      // Check if user need to change password if so the force to change password
      if (res.data.needPasswordChange) {
        toast.warning("Please Change Your Default Password!", { id: toastId });
        // Redirect to Change Password page
        navigate("/change-password");
      } else {
        // Redirect to Dashboard
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something Went Wrong!", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="id" label="ID: " />
        <PHInput type="password" name="password" label="PASSWORD: " />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
}

export default Login;
