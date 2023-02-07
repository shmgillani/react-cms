import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Box,
  FormGroup,
  Button,
} from "@material-ui/core";
import { editPage } from "../service/api";
import { useHistory, useLocation } from "react-router-dom";

const EditAyah = () => {
  const history = useHistory();
  const { query } = useLocation();

  let initialValue = {
    number: query.number,
    text: query.text,
    numberInSurah: query.numberInSurah,
    juz: query.juz,
    juz_name: query.juz_name,
    page: query.page,
    hizbQuarter: query.hizbQuarter,
    ayahsNumber: query.ayahsNumber,
    surahNumber: query.surahNumber,
    numberInPage: query.numberInPage,
    audio: query.audio,
    audioIdentifier: query.audioIdentifier,
    translation: query.translation,
  };

  // const loadAyahData = async () => {
  //   const response = await getAllAyahs(query.id);
  //   // console.log(response);
  //   setAyah(response);
  // };

  // useEffect(() => {
  //   loadAyahData();
  // }, []);

  const [page, setPage] = useState({});
  const [ayah, setAyah] = useState(initialValue);
  // const { ayahText, urTranslation, enTranslation, audio } = ayah;

  // console.log("==========================", initialValue);

  const onValueChange = (e) => {
    const { name, value } = e.target;
    // console.log("-------------------translation-----------------------",query.pages.ayahs[query.number].translation[name]);
    query.pages.ayahs[query.numberInPage].translation[name] = value;

    setPage(query.pages);

    // setAyah({ ...ayah });
  };
  // console.log("ayaah object", ayah);
  // const updateUrTrans = (ur) => {
  //   let newAyah = [...ayah];
  //   newAyah.map((data) => (data.translation.ur = ur));
  //   setAyah(newAyah);
  // };

  // const updateEnTrans = (en) => {
  //   en.preventDefault();
  //   let newAyah = [...ayah];
  //   // console.log(newAyah);
  //   newAyah.map((data) => {
  //     console.log(en);
  //     // data.translation.en = en;
  //   });
  //   setAyah(newAyah);
  //   console.log("----------------", ayah);
  // };

  // const updateAudio = (audio) => {
  //   let newAyah = [...ayah];
  //   newAyah.map((data) => (data.translation.audio = audio));
  //   setAyah(newAyah);
  // };

  const editPageDetails = async () => {
    // console.log("--------------------------------------", page);
    await editPage(query.pages.id, page);
    history.push(`/allPages`);
  };

  return (
    <Container maxWidth="sm">
      <Box my={5}>
        <Typography variant="h5" align="center">
          Update Ayah Details
        </Typography>
        <FormGroup>
          <FormControl>
            <label>Ayah:</label>
            <Input name="text" value={ayah.text} readOnly />
          </FormControl>
          <FormControl>
            <label>Urdu Translation:</label>
            <Input
              onChange={(ur) => onValueChange(ur)}
              name="ur"
              value={ayah?.translation?.ur}
            />
          </FormControl>
          <FormControl>
            <label>English Translation:</label>
            <Input
              onChange={(en) => onValueChange(en)}
              name="en"
              value={ayah?.translation?.en}
            />
          </FormControl>
          <FormControl>
            <label>Audio:</label>
            <Input
              onChange={(audio) => onValueChange(audio)}
              name="audio"
              value={ayah.audio}
            />
          </FormControl>
          <Box my={3}>
            <Button
              variant="contained"
              onClick={() => editPageDetails()}
              color="primary"
              align="center"
            >
              Update Ayah
            </Button>
            <Button
              onClick={() => history.push("/allPages")}
              variant="contained"
              color="secondary"
              align="center"
              style={{ margin: "0px 20px" }}
            >
              Cancel
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </Container>
  );
};

export default EditAyah;
