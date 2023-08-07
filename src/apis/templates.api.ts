import axios from "axios";
import { template , hostBE} from "./constants";

class TemplateAPI {
    async getAll() {
      return await axios.get(`${hostBE}/${template}/get-all-templates`);
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

          const req = await axios.post(`${hostBE}/${template}/add`, formData, {
              headers: { "content-type": "multipart/form-data" },

          } );


          return req.data

        }
      }
     
    }
  }

export default new TemplateAPI();