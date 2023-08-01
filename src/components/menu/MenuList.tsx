import {
  HomeOutlined,
  FileDoneOutlined,
  UserOutlined,
  LogoutOutlined,
  FileAddOutlined,
  FileImageFilled,
} from "@ant-design/icons";

const menus = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "/my-cv",
    icon: <FileDoneOutlined />,
    label: "My CV",
  },
  {
    key: "/my-cv/add",
    icon: <FileAddOutlined />,
    label: "Add New",
  },
  {
    key: "/templates/list",
    icon: <FileImageFilled />,
    label: "Templates",
    children: [
      {
        key: "/templates/list",
        icon: <LogoutOutlined />,
        label: "List Templates",
      },
      {
        key: "/templates/add",
        icon:<FileAddOutlined />,
        label: "Add Templates",
      },
      {
        key: "/templates/edit",
        icon: <LogoutOutlined />,
        label: "Edit Templates",
      }
    ],
    
  },
  {
    key: "/account",
    icon: <UserOutlined />,
    label: "Account",
    children: [
      {
        key: "/account/logout",
        icon: <LogoutOutlined />,
        label: "Logout",
      },
    ],
  },
];

export default menus;
