import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TemplateAPI from "../../apis/templates.api";
import type { ColumnsType } from "antd/es/table";
import { Divider, Radio, Table, Button, Space, Modal } from "antd";
import ModalTemplate from "../templates/modal.template";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "./template.css";
import Swal from 'sweetalert2';
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
          onClick={()=>deleteItem(record)}
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
  const deleteItem = async (item: DataType) => {
  Swal.fire({
    title: 'The Delete?',
    text: 'That thing is will be deleted?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const response = await TemplateAPI.deleteByID(item.key);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Saved!',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }
      
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
   

  };
  


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
