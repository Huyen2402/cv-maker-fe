import { Menu } from "antd";
import menus from "./MenuList";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MenuComponent(props: any) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [select, setSelect] : any = useState("");

  useEffect(() => {
    const data = pathname.toString();
    console.log(data);
    const itemMenu = menus.find(x=> x.key === data);
    setSelect(itemMenu?.key);
  },[pathname]);


  
  return (
    <Menu
      theme="dark"
      mode="inline"

      selectedKeys={[select]}
      onSelect={(e) => {
        setSelect(e.key);
        console.log('select 2', select);
        if (e.key === "/account/logout") {
          localStorage.removeItem("token");
          navigate("/login");
        }else{

          
          
          navigate(e.key);
        }
      }
    }
      
      items={menus}
    />
  );
}
