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
import { editAyah, getAllAyahs } from "../service/api";
import { useHistory, useLocation } from "react-router-dom";

const EditAyah = () => {
  const history = useHistory();
  const { query } = useLocation();

  let initialValue = {
    number: query.id,
    text: query.text,
    urTranslation: query.urTranslation,
    enTranslation: query.enTranslation,
    audio: query.audio,
  };

  const loadAyahData = async () => {
    const response = await getAllAyahs(query.id);
    // console.log(response);
    setAyah(response);
  };

  useEffect(() => {
    loadAyahData();
  }, []);

  const [ayah, setAyah] = useState(initialValue);
  // const { ayahText, urTranslation, enTranslation, audio } = ayah;

  // console.log("==========================", initialValue);

  // const onValueChange = (e) => {
  //   //  console.log(e);
  //   // console.log(e.target.value);
  //   setAyah({ ...ayah, [e.target.name]: e.target.value });
  // };

  const updateUrTrans = (ur) => {
    let newAyah = [...ayah];
    newAyah.map((data) =>
      data.map((d) => {
        d.translation.ur = ur;
      })
    );
    setAyah(newAyah);
  };

  const updateEnTrans = (en) => {
    let newAyah = [...ayah];
    console.log(newAyah);
    newAyah.map((data) =>
      data.map((d) => {
        d.translation.en = en;
      })
    );
    setAyah(newAyah);
  };

  const updateAudio = (audio) => {
    let newAyah = [...ayah];
    newAyah.map((data) =>
      data.map((d) => {
        d.translation.audio = audio;
      })
    );
    setAyah(newAyah);
  };

  const editAyahDetails = async () => {
    // console.log("------------------------", ayah);
    await editAyah(query.page, query.id, ayah);
    history.push("/allAyahs");
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
            <Input name="ayahText" value={ayah.text} readOnly />
          </FormControl>
          <FormControl>
            <label>Urdu Translation:</label>
            <Input
              onChange={(ur) => updateUrTrans(ur)}
              name="urdu translation"
              value={ayah.urTranslation}
            />
          </FormControl>
          <FormControl>
            <label>English Translation:</label>
            <Input
              onChange={(en) => updateEnTrans(en)}
              name="endlish translation"
              value={ayah.enTranslation}
            />
          </FormControl>
          <FormControl>
            <label>Audio:</label>
            <Input
              onChange={(audio) => updateAudio(audio)}
              name="audio"
              value={ayah.audio}
            />
          </FormControl>
          <Box my={3}>
            <Button
              variant="contained"
              onClick={() => editAyahDetails()}
              color="primary"
              align="center"
            >
              Update Ayah
            </Button>
            <Button
              onClick={() => history.push("/allAyahs")}
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
