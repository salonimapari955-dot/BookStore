import axios from "axios";
import { API_URL } from "../config/api";

const BOOK_API_URL = `${API_URL}/book`;

export const deleteBook = async (id) => {
  return await axios.delete(`${BOOK_API_URL}/${id}`);
};
