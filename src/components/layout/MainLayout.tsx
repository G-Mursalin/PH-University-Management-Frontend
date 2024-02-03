import { Layout } from "antd";
import { Button } from "antd/es/radio";
import { Outlet } from "react-router-dom";
import { logOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import Sidebar from "./Sidebar";
const { Header, Content } = Layout;

function MainLayout() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div style={{}}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
