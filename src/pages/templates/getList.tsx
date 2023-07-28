import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TemplateAPI from "../../apis/templates.api";
import Home from "../../pages/home";
import Login from "../../pages/login";
import { RequireAuth } from "../../guards/RequireAuth";
import MainLayout from "../../components/layout/MainLayout";
import type { ColumnsType } from 'antd/es/table';
import { Divider, Radio, Table } from 'antd';
import { useState, useEffect } from "react";
import "./template.css"
interface DataType {
    key: React.Key;
    name: string;
    image: number;
    title: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => <img className="img-template" src={`${image}`} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
  ];

  // rowSelection object indicates the need for row selection

function GetTemplate() {
  const [data, setData] : any = useState([]);
    useEffect(() => {
      async function get() {
        let item;
        const result = await TemplateAPI.getAll();
        const array =result.data.result;
       const data1 = array.map((x: any) => {
          return item  = {
             key: x.id,
             name: x.name,
             image: x.image,
             title: x.title,
         }
       
         });
        setData(data1);
      }
      get();
    });
    
  return (
    // <MainLayout/>
    <>
    <Divider>List Templates</Divider>
    <Table columns={columns} dataSource={data} size="small" />
   
  </>
  
  );
}

export default GetTemplate;
