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
import { getAllAyahs } from "../service/api";
import { Link } from "react-router-dom";
import { Howl, Howler } from "howler";
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

  const [ayah, setAyah] = useState([]);
  useEffect(() => {
    getAyahs();
  }, []);

  const getAyahs = async () => {
    const response = await getAllAyahs();
    // console.log(response[0][0]);
    setAyah(response);
  };

  const audioPlay = (audio) => {
    let sound = new Howl({
      src: [audio],
    }).play();

    Howler.volume(1.0);
    return sound;
  };

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.thead}>
          <TableCell>AyahId</TableCell>
          <TableCell>Ayah</TableCell>
          <TableCell>Urdu Translation</TableCell>
          <TableCell>English Translation</TableCell>
          <TableCell>Audio</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ayah.map((data) =>
          data.map((d) => (
            <TableRow className={classes.trow}>
              <TableCell>{d.number}</TableCell>
              <TableCell>{d.text}</TableCell>
              <TableCell>{d.translation.ur}</TableCell>
              <TableCell>{d.translation.en}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    audioPlay(d.audio);
                  }}
                >
                  Play
                </Button>
              </TableCell>
              <TableCell>
                <Link
                  to={{
                    pathname: `/editAyah/${d.number}`,
                    query: {
                      id: d.number,
                      text: d.text,
                      urTranslation: d.translation.ur,
                      enTranslation: d.translation.en,
                      audio: d.audio,
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "0px 20px" }}
                    onClick={() => {
                      // console.log("-----------------");
                      // console.log(index);
                      console.log("-------------------");
                      console.log(d.audio);
                    }}
                  >
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AllAyahs;
