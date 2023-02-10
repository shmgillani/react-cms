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
    tafseer: query.tafseer
  };

  const [page, setPage] = useState({});
  const [ayah, setAyah] = useState(initialValue);

  const onTranslationChange = (e) => {
    const { name, value } = e.target;
    query.pages.ayahs[query.numberInPage].translation[name] = value;

    setPage(query.pages);

  };

  const onTafseerChange = (e) => {
    const { name, value } = e.target;
    query.pages.ayahs[query.numberInPage].tafseer[name] = value;

    setPage(query.pages);

  };
  
  const editPageDetails = async () => {
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
              onChange={(ur) => onTranslationChange(ur)}
              name="ur"
              value={ayah?.translation?.ur}
            />
          </FormControl>
          <FormControl>
            <label>English Translation:</label>
            <Input
              onChange={(en) => onTranslationChange(en)}
              name="en"
              value={ayah?.translation?.en}
            />
          </FormControl>
          <FormControl>
            <label>Urdu Tafseer:</label>
            <Input
              onChange={(ur) => onTafseerChange(ur)}
              name="ur"
              value={ayah?.tafseer?.ur}
            />
          </FormControl>
          <FormControl>
            <label>English Tafseer:</label>
            <Input
              onChange={(en) => onTafseerChange(en)}
              name="en"
              value={ayah?.tafseer?.en}
            />
          </FormControl>
          <FormControl>
            <label>Audio:</label>
            <Input
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
