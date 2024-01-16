import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { adminSidebarItems } from "../../routes/admin.routes";
const { Header, Content, Footer, Sider } = Layout;

function MainLayout() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            color: "white",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem 0 1rem 0",
          }}
        >
          <h1>PH University</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={adminSidebarItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          PH University Management ©{new Date().getFullYear()} Created by PH
          University
        </Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
