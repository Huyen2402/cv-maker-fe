import axios from "axios";
import { template , hostBE} from "./constants";
class TemplateAPI {
    async getAll() {
      return await axios.get(`${hostBE}/${template}/get-all-templates`);
    }
  }

  export default new TemplateAPI();