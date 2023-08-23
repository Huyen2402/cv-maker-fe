import { Divider, Radio, Table, Button, Space, Modal } from "antd";
import MainLayout from "../../components/layout/MainLayout";
import type { ColumnsType, TableProps } from 'antd/es/table';
import React from "react";
import cvApi from "../../apis/cv.api";
import { EditOutlined, DownloadOutlined } from "@ant-design/icons";
interface DataType {
    key: React.Key;
    job_title: string;
    image: number;
    action: string;
  }
function MyCV() {
    const columns: ColumnsType<DataType> = [
        {
          title: 'Job Title',
          dataIndex: 'job_title',
        },
        {
          title: 'Image',
          dataIndex: 'image',
          render: (image) => <img className="img-template" src={`${image}`} />,
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: (_:any, record: any) =>   <Space size="middle">
       <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={async ()=>{
       
        const response = await cvApi.downloadPDF(record.id);
        if (response && response.status === 200)
          window.open(response.data.url);
      }
       }>
            Download
          </Button>
     
       
    </Space> ,
        },
      ];
      const data: DataType[] = [
        {
          key: '1',
          job_title: 'John Brown',
          image: 32,
          action: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          job_title: 'Jim Green',
          image: 42,
          action: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          job_title: 'Joe Black',
          image: 32,
          action: 'Sydney No. 1 Lake Park',
        },
      ];
      const [data2, setData]: any = React.useState([]);
      React.useEffect(() => {
        async function get() {
          let item;
          const result = await cvApi.getAll();
          const array = result.data;
          const data1 = array.map((x: any) => {
            return (item = {
              key: x.id,
              job_title: x.job_title,
              image: x.path
            });
          });
    
          setData(data1);
         
          
        }
        get();
      }, []);
      console.log(data2);
      
   return(
    <MainLayout>
    <Table columns={columns} dataSource={data2} size="middle" />
    </MainLayout>
   )
    
}
export default MyCV;