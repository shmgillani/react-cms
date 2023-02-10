import React, { useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
const useStyle = makeStyles({
  table: {
    width: "80%",
    margin: "50px 100px 100px 140px",
  },
  thead: {
    "& > *": {
      background: "#000000",
      color: "#FFFFFF",
      fontSize: "16px",
    },
  },
  trow: {
    "& > *": {
      fontSize: "16px",
    },
  },
});

const AllAyahs = () => {
  const classes = useStyle();
  const { query } = useLocation();

  let pages = {
    id: query.id,
    page: query.page,
    juz: query.juz,
    juz_name: query.juz_name,
    firstSurahName: query.firstSurahName,
    firstSurahEngName: query.firstSurahEngName,
    ayahs: query.ayahs,
  };

  const [ayah, setAyah] = useState([]);
  useEffect(() => {
    getAyahs();
  }, []);

  const getAyahs = async () => {
    let ayahs = pages.ayahs.filter((ayah) => !ayah.hasOwnProperty("name"));
    // console.log("++++++++++++++++++++", ayahs);
    setAyah(ayahs);
  };

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.thead}>
          <TableCell>Id in Quran</TableCell>
          <TableCell>Id in Surah</TableCell>
          <TableCell>Ayah</TableCell>
          <TableCell>Urdu Translation</TableCell>
          <TableCell>English Translation</TableCell>
          <TableCell>Urdu Tafseer</TableCell>
          <TableCell>English Tafseer</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ayah.map((data) => (
          <TableRow key={data.number} className={classes.trow}>
            <TableCell>{data.number}</TableCell>
            <TableCell>{data.numberInSurah}</TableCell>
            <TableCell>{data.text}</TableCell>
            <TableCell>{data?.translation?.ur}</TableCell>
            <TableCell>{data?.translation?.en}</TableCell>
            <TableCell>{data?.tafseer?.ur}</TableCell>
            <TableCell>{data?.tafseer?.en}</TableCell>
            <TableCell>
              <Link
                to={{
                  pathname: `/editAyah/${data.number}`,
                  query: {
                    number: data.number,
                    text: data.text,
                    numberInSurah: data.numberInSurah,
                    juz: data.juz,
                    juz_name: data.juz_name,
                    page: data.page,
                    hizbQuarter: data.hizbQuarter,
                    ayahsNumber: data.ayahsNumber,
                    surahNumber: data.surahNumber,
                    numberInPage: data.numberInPage,
                    audio: data.audio,
                    audioIdentifier: data.audioIdentifier,
                    translation: data.translation,
                    tafseer: data.tafseer,
                    pages,
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "0px 20px" }}
                >
                  Edit
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllAyahs;
