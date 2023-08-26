import axios from "axios";
import apiClient from "./base.api";

const path: string = "cv";

class CVAPI {
  async getAll() {
    return await apiClient.get(`/${path}/get-mycv`);
  }
async addCV(body:any) {
    let formData: FormData = new FormData();
    console.log(body);
    
    if(body){
      const userId: string = body.userId;
      const name: string = body.name;
      const job_title = body.job_title;
      const phone = body.phone;
      const address = body.address;
      const objective = body?.objective;
      const gender = body.gender;
      const skills = body.skills;
      const projects = body.projects;
      const certifications = body.certifications;
      const experince = body.experience;
      const template_id = body.template_id;
      const avatar: File = body?.avatar.file.originFileObj as File
      if(avatar){
        formData.append("userId", userId)
        formData.append("name",name)
        formData.append("job_title",job_title)
        formData.append("address",address)
        formData.append("phone",phone)
        formData.append("objective",objective)
        formData.append("gender",gender)
        formData.append("skills",skills)
        formData.append("projects",projects)
        formData.append("certifications",certifications)
        formData.append("experince",experince)
        formData.append("template_id",template_id)
        formData.append("avatar",avatar)
        const req = await axios.post(`/${path}/add`, formData, {
            headers: { "content-type": "multipart/form-data" },

        } );


        return req.data

      }
    }
   
  }

  async downloadPDF(cvId: number) {
    return await apiClient.post(`/${path}/download-pdf`, {cvId}, {headers: { "content-type": "multipart/form-data" }});
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CVAPI();