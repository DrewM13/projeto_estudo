import { http } from "./http";


export default class baseService {
  constructor (api) {
    this.http = http
  }

  Login = async $data => {
    try {
      const response = await http.post('credentials/', $data)
      return response.data
    } catch (error) {
      return  error
    }
  }
  getDataAdm = async () => {
    try {
      const response = await http.get('adm/')
      return response.data
    } catch (error) {
    }
  }
  getUserById = async (id) => {
    try {
      const response = await http.get(`adm/${id}`)
      return response
    } catch (error) {
    }
  }
  addUser = async $data => {
    try {
      const response = await http.post('adm/AddUser',$data)
      console.log(response);
      return response
    } catch (error) {
    }
  }
   editUser = async ($data) => {
    try {
      const response = await http.put(`adm/${$data.idUsers}`,$data)
      return response
    } catch (error) {
    }
  }
  deleteUser = async (id) => {
    try {
      const response = await http.delete(`adm/${id}`)
      return response
    } catch (error) {
    }
  }

}
