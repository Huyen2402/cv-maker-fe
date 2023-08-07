import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TemplateAPI from "../../apis/templates.api";
import Home from "../../pages/home";
import Login from "../../pages/login";
import { RequireAuth } from "../../guards/RequireAuth";
import MainLayout from "../../components/layout/MainLayout";
import type { ColumnsType } from "antd/es/table";
import { Divider, Radio, Table, Button, Space, Modal } from "antd";
import ModalTemplate from "../templates/modal.template";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "./template.css";
interface DataType {
  key: React.Key;
  action: string;
  image: number;
  title: string;
  file: string
}



// rowSelection object indicates the need for row selection

function GetTemplate() {

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      // eslint-disable-next-line jsx-a11y/alt-text
      render: (image) => <img className="img-template" src={`${image}`} />,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_:any, record: any) =>   <Space size="middle">
      <Button
        shape="circle"
        size={'large'}
        icon={<EditOutlined style={{ color: 'rgba(36, 84, 157, 1)' }} />}
        onClick={()=>showModal(record)}
      />
     
        <Button
          shape="circle"
          size={'large'}
         
          icon={<CloseOutlined />}
        />
   
    </Space> ,
    },
  ];
 
  const [data, setData]: any = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [item, setItem] = useState<object>();

  const showModal = (re: any) => {

    
    if(re){
      setItem(re);
      setIsModalOpen(true);
    }

  };

  const handleOk = () => {
    setItem({})
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setItem({})

    setIsModalOpen(false);

  };

  console.log(item);
  


  useEffect(() => {
    async function get() {
      let item;
      const result = await TemplateAPI.getAll();
      const array = result.data;
      const data1 = array.map((x: any) => {
        return (item = {
          key: x.id,
          title: x.title,
          image: x.image,
          file: x.name
        });
      });

      setData(data1);
      console.log(data1);
      
    }
    get();
  }, []);

  return (
    // <MainLayout/>
    <>
      <Divider>List Templates</Divider>
      <Table columns={columns} dataSource={data} size="small" />

      <ModalTemplate
        item={item}
        isEdit={isEdit}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}


export default GetTemplate;
