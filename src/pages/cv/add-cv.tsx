import React, {useState, useEffect } from "react";
import jwt from "jwt-decode";
import TemplateAPI from "../../apis/templates.api";
import {
  UploadOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Image, Form, Input, Radio, Upload, notification, Steps } from "antd";
import MainLayout from "../../components/layout/MainLayout";
import type { RadioChangeEvent } from "antd";
import ExperiencesList from "../../components/list/ExperiencesList";
import SkillsList from "../../components/list/SkillsList";
import ProjectsList from "../../components/list/ProjectsList";
import cvApi from "../../apis/cv.api";

type ExperienceType = {
  id?: string;
  position?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
};
type SkillsType = {
  id?: string;
  name: string;
  scores: string
}
type ProjectsType = {
  id?: string;
  name: string;
  urlGit?: string;
  description?: string
}

function AddCV() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  const [value, setValue] = useState(1);
  const [value1, setValue1] = useState();
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const onChange1 = (e: RadioChangeEvent) => {
    setValue1(e.target.value);
  };
  const [experiences, setExperiences] = React.useState<ExperienceType[]>([]);
  const addExperience = React.useCallback( () => {
    const item = {
      id: Date.now().toString(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
    };

    setExperiences([...experiences, item]);
    
  },[experiences])

  const [skills, setSkills] = React.useState<SkillsType[]>([]);
  const addSkills = React.useCallback(() => {
    const itemSkill: SkillsType = {
      id: Date.now().toString(),
      name: "",
      scores: ""

    };
    setSkills([...skills, itemSkill]);
  }, [skills] )
 
  const [projects, setProjects] = React.useState<ProjectsType[]>([]);
  const addProjects = React.useCallback(() => {
    const itemProject: ProjectsType = {
      id: Date.now().toString(),
      name: "",
      urlGit: "",
      description: "",

    };
    setProjects([...projects, itemProject]);
  }, [projects] )


  const removeExperience = React.useCallback((id: string) => {
    if(id && experiences.length > 0){
      // remove by ID
      const newState: any[] = experiences.filter( (obj: any) => obj.id !== id)
      setExperiences(newState)
    }
  }, [experiences]);

  const setValueExperience = React.useCallback((id: string, position: string, company: string, start: string, end: string) => {
    
    let element : any | undefined = experiences.find((e) => e.id === id);
    if (element != undefined) {
      element.position = position;
      element.company = company;
      element.start = start;
      element.end = end;
    }
  },[experiences])

  const removeSkills = React.useCallback((id: string) => {
    if(id && skills.length > 0){
      // remove by ID
      const newState: any[] = skills.filter( (obj: any) => obj.id !== id)
      setSkills(newState)
    }
  }, [skills]);

  const setValueSkill = React.useCallback((id: string, name: any) => {
    
    let element : any | undefined = skills.find((e) => e.id === id);
   
    if (element.name != undefined) {
      element.name = name;
    }
  },[skills])

  const setValueSProject = React.useCallback((id: string, name: string, urlGit: string, description?: string) => {
    
    let element : any | undefined = projects.find((e) => e.id === id);
    if (element != undefined) {
      element.name = name;
      element.urlGit = urlGit;
      element.description = description;
    }
  },[projects])
  

  const removeProjects= React.useCallback((id: string) => {
    if(id && projects.length > 0){
      // remove by ID
      const newState: any[] = projects.filter( (obj: any) => obj.id !== id)
      setProjects(newState)
    }
  }, [projects]);
  const [data, setData]: any = useState([]);
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
      
      
    }
    get();
  }, []);

  type CV = {
    name: string;
    job_title: string;
    phone: string;
    address: string;
    objective?: string;
    gender: boolean;
    skills?: object
    project?: object;
    avatar: File;
    certifications: string;
    experince: object;
    template_id: number
  }
  const [step, setStep] = useState(1);
  const SubmitAddCV = async (cv: CV) => {
    const accessToken: any = localStorage.getItem("accessToken");
    const decode: any = jwt(accessToken);
    
   const body = {
    userId: decode.data._id,
    name: cv.name,
    job_title: cv.job_title,
    phone: cv.phone,
    address: cv.address,
    objective: cv.objective,
    gender: cv.gender || '',
    skills: JSON.stringify(skills),
    projects: JSON.stringify(projects),
    avatar: cv.avatar,
    certifications: cv.certifications,
    experience: JSON.stringify(experiences),
    template_id: cv.template_id
    }
    
    const response = await cvApi.addCV(body);
    console.log(response);
    if (response.status === 200){
      setStep(1);
      notification.success({
        message: "Add CV successfully!",
        placement: "topRight",
      });

      const responsePDF = await cvApi.downloadPDF(response.id);
        if (responsePDF && responsePDF.status === 200)
        {
          window.open(response.data.url);
          setStep(2);
        }
         
    }
    
  }


  return (
    <MainLayout>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={(cv) => SubmitAddCV(cv)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Job Title"
          name="job_title"
          rules={[{ required: true, message: "Please input your job title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Objective" name="objective">
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Male</Radio>
            <Radio value={2}>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<FieldType> label="Skills" name="skills">
          <Button
            onClick={addSkills}
            icon={<PlusCircleOutlined />}
            shape="circle"
            style={{
              marginBottom: "8px",
            }}
          ></Button>
          <SkillsList
            data={skills || []}
            removeSkills={removeSkills}
            setValueSkill={setValueSkill}
          />
        </Form.Item>

        <Form.Item<FieldType> label="Projects" name="projects">
          <Button
            style={{
              marginBottom: "8px",
            }}
            onClick={addProjects}
            icon={<PlusCircleOutlined />}
            shape="circle"
          ></Button>
          <ProjectsList
            data={projects || []}
            removeProjects={removeProjects}
            setValueSProject={setValueSProject}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Avatar"
          name="avatar"
          rules={[{ required: true, message: "Please input your avatar!" }]}
        >
          <Upload listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item<FieldType> label="Certifications" name="certifications">
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="Experince" name="experince">
          <Button
            onClick={addExperience}
            icon={<PlusCircleOutlined />}
            shape="circle"
            style={{
              marginBottom: "8px",
            }}
          ></Button>

          <ExperiencesList
            data={experiences || []}
            removeExperience={removeExperience}
            setValueExperience={setValueExperience}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Template"
          name="template_id"
          rules={[{ required: true, message: "Please input your Template!" }]}
        >
          <Radio.Group onChange={onChange1} value={value1}>
          {data.map((x: any) => (
             
              <Form.Item
                rules={[{ required: true }]}
                style={{
                  display: "inline-block",
                  width: "calc(40% - 8px)",
                  margin: "0 8px",
                }}
              >
                <h1>{x.name}</h1>
                <Image
                  width={100}
                  src={x.image}
                />
                <Radio value={x.key}></Radio>
              </Form.Item>
           
          ))}
           </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Steps
    current={step}
    items={[
      {
        title: 'Save CV',
        
      },
      {
        title: 'Generate PDF',
        
      },
      {
        title: 'Done',
        
      },
    ]}
  />
    </MainLayout>
  );
}

export default AddCV;
