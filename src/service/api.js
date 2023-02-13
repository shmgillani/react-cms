import axios from "axios";

const userUrl = "http://localhost:3000/user";
const quranUrl = "http://localhost:3000/quran";
const ayahsUrl = "http://localhost:3000/ayahs";

export const getallUsers = async (id) => {
  id = id || "";
  return await axios.get(`${userUrl}/${id}`);
};

export const addUser = async (user) => {
  return await axios.post(userUrl, user);
};

export const editUser = async (id, user) => {
  // console.log("------------------", id, "++++++++++", user);
  return await axios.put(`${userUrl}/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${userUrl}/${id}`);
};

export const getAllAyahs = async (number) => {
  number = number || "";
  // let quran = await axios.get(`${quranUrl}`);
  let quran = await axios.get(`${ayahsUrl}`);
  // console.log("------------------------", quran);
  let ayahs = quran.data.filter((ayah) => !ayah.hasOwnProperty("name"));
  console.log("++++++++++++++++++++++++++++++++++", ayahs);
  // for (let i = 0; i < quran.data.length; i++) {
  //   ayahs.push(
  //     quran.data[i].ayahs.filter((ayah) => !ayah.hasOwnProperty("name"))
  //   );
  // }
  return ayahs;
};

export const getAllPages = async (id) => {
  id = id || "";
  let pages = await axios.get(`${quranUrl}/${id}`);
  // console.log("---------------------", pages);
  return pages;
};

export const addAyah = async (ayah) => {
  return await axios.post(quranUrl, ayah);
};

export const editPage = async (id, page) => {
  // console.log("------------------", id, "++++++++++", ayah);
  return await axios.put(`${quranUrl}/${id}`, page);
  // console.log("--------------------", ayat);
};

export const deleteAyah = async (id) => {
  return await axios.delete(`${quranUrl}/${id}`);
};
