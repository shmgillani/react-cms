import React, { useState, useEffect } from "react";
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
import { useHistory, useLocation, useParams } from "react-router-dom";

const EditAyah = () => {
  const history = useHistory();
  const { query } = useLocation();
  const params = useParams();

  // console.log("=====================================", query);

  const [page, setPage] = useState({});
  const [ayah, setAyah] = useState({});

  // useEffect(async () => {

  // }, [ayah]);

  useEffect(() => {
    setAyah(JSON.parse(localStorage.getItem("ayah")));
    setPage(JSON.parse(localStorage.getItem("page")));
  }, []);

  const onTranslationChange = (e) => {
    const { name, value } = e.target;
    page.ayahs[ayah.numberInPage].translation[name] = value;

    setPage(page);
  };

  const onTafseerChange = (e) => {
    const { name, value } = e.target;
    page.ayahs[ayah.numberInPage].tafseer[name] = value;

    setPage(page);
  };

  const editPageDetails = async () => {
    await editPage(page.id, page);
    history.push(`/allAyahs/${page.id}`);
  };

  return (
    <Container maxWidth="sm">
      <Box my={5}>
        <Typography variant="h5" align="center">
          Update Ayah Details
        </Typography>
        <FormGroup>
          <FormControl>
            <InputLabel>Ayah:</InputLabel>
            <Input name="text" value={ayah.text} readOnly />
          </FormControl>
          <FormControl>
            <InputLabel>Urdu Translation:</InputLabel>
            <Input
              onChange={(ur) => onTranslationChange(ur)}
              name="ur"
              value={ayah?.translation?.ur}
            />
          </FormControl>
          <FormControl>
            <InputLabel>English Translation:</InputLabel>
            <Input
              onChange={(en) => onTranslationChange(en)}
              name="en"
              value={ayah?.translation?.en}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Urdu Tafseer:</InputLabel>
            <Input
              onChange={(ur) => onTafseerChange(ur)}
              name="ur"
              value={ayah?.tafseer?.ur}
            />
          </FormControl>
          <FormControl>
            <InputLabel>English Tafseer:</InputLabel>
            <Input
              onChange={(en) => onTafseerChange(en)}
              name="en"
              value={ayah?.tafseer?.en}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Audio:</InputLabel>
            <Input name="audio" value={ayah.audio} />
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
              onClick={() => history.push(`/allAyahs/${page.id}`)}
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
