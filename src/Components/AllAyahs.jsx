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
import { Link, useLocation, useParams } from "react-router-dom";
import { getAllPages } from "../service/api";

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

  const params = useParams();
  // console.log("+++++++++++++++++++++++++++++", params);

  const [ayah, setAyah] = useState([]);
  const [pages, setPages] = useState({});

  const getPages = async () => {
    const response = await getAllPages();
    // console.log("+++++++++++++++++++++++++++", res);
    return response;
  };
  useEffect(async () => {
    let res = await getPages();
    localStorage.setItem(
      "page",
      JSON.stringify(res.data.find((element) => element.id == params.pageId))
    );
  }, [ayah]);

  useEffect(() => {
    setPages(JSON.parse(localStorage.getItem("page")));
    setAyah(
      JSON.parse(localStorage.getItem("page")).ayahs?.filter(
        (ayah) => !ayah.hasOwnProperty("name")
      )
    );
  }, []);

  

  // console.log("====================================", params);

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
        {ayah?.length
          ? ayah.map((data) => (
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
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: "0px 20px" }}
                      onClick = {() => {localStorage.setItem(
                        "ayah",
                        JSON.stringify(data)
                      )
                      localStorage.setItem(
                        "page",
                        JSON.stringify(pages)
                      )}}
                    >
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          : ""}
      </TableBody>
    </Table>
  );
};

export default AllAyahs;
