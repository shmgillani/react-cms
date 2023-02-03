import axios from "axios";

const userUrl = "http://localhost:3000/user";
const quranUrl = "http://localhost:3000/quran";

export const getallUsers = async (id) => {
  id = id || "";
  return await axios.get(`${userUrl}/${id}`);
};

export const addUser = async (user) => {
  return await axios.post(userUrl, user);
};

export const editUser = async (id, user) => {
  console.log("------------------", userUrl, "++++++++++", typeof id);
  return await axios.put(`${userUrl}/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${userUrl}/${id}`);
};

export const getAllAyahs = async (number) => {
  number = number || "";
  let quran = await axios.get(`${quranUrl}`);
  let ayahs = [];
  for (let i = 0; i < quran.data.length; i++) {
    ayahs.push(
      quran.data[i].ayahs.filter((ayah) => !ayah.hasOwnProperty("name"))
    );
  }
  return ayahs;
};

export const addAyah = async (ayah) => {
  return await axios.post(quranUrl, ayah);
};

export const editAyah = async (number, ayah) => {
  try {
    return await axios.put(`${quranUrl}/${number}`, ayah);
  } catch (err) {
    console.log(err);
    return err;
  }
  // console.log("--------------------", ayat);
};

export const deleteAyah = async (id) => {
  return await axios.delete(`${quranUrl}/${id}`);
};
