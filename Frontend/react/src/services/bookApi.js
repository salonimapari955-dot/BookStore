import axios from "axios";

const API_URL = "http://localhost:4001/book"; 

export const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};