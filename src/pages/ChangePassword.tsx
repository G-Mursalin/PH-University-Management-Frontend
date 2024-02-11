import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing Password...");
    try {
      await changePassword(data).unwrap();

      dispatch(logOut());
      navigate("/login");
      toast.success(
        "Password changed successfully. Please login again with your new password",
        { id: toastId }
      );
    } catch (error) {
      toast.error("Failed to changed password!", { id: toastId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password" />
        <PHInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Change Password</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
