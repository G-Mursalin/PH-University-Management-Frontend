import { Layout, Menu } from "antd";
import { sidebarItemsGenerators } from "../../utils/sidebarItemsGenerators";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

function Sidebar() {
  // Set sidebars items based on role
  const role = "admin";
  let sideBarItems;

  switch (role) {
    case userRole.ADMIN:
      sideBarItems = sidebarItemsGenerators(adminPaths, "admin");
      break;
    case userRole.FACULTY:
      sideBarItems = sidebarItemsGenerators(facultyPaths, "faculty");
      break;
    case userRole.STUDENT:
      sideBarItems = sidebarItemsGenerators(studentPaths, "student");
      break;
    default:
      break;
  }

  return (
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
        items={sideBarItems}
      />
    </Sider>
  );
}

export default Sidebar;
