import axios from "axios";
import apiClient from "./base.api";

const path: string = "template";

class TemplateAPI {
    async getAll() {
      return await apiClient.get(`${path}/get-all-templates`);
    }
    async getByID(id: number) {
      return await axios.get(`${path}/get/${id}`);
    }
    async addTemplate(body:any) {
      let formData: FormData = new FormData();
      if(body){
        const file: File = body.name.file.originFileObj as File
        const title: string = body?.title
        const image: File = body?.image.file.originFileObj as File
        if(file && title && image){
          formData.append("file_template",file)
          formData.append("title",title)
          formData.append("image",image)

          const req = await axios.post(`${path}/add`, formData, {
              headers: { "content-type": "multipart/form-data" },

          } );


          return req.data

        }
      }
     
    }
    async editTemplate(body:any) {
      let formData: FormData = new FormData();
      let image: any = '';
      let file: any = '';
      if(body){
        if(body.name){
           file = body.name.file.originFileObj as File 
        }
        if(body.image){
           image = body.image.file.originFileObj as File 
        }
        const title: string = body?.title
        
        if(title){
          formData.append("file_template",file)
          formData.append("title",title)
          formData.append("image",image)

          const req = await axios.put(`${path}/update/${body.id}`, formData, {
              headers: { "content-type": "multipart/form-data" },

          } );


          return req.data

        }
      }
     
    }
    async deleteByID(id: any) {
      return await axios.delete(`${path}/delete/${id}`);
    }
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default new TemplateAPI();