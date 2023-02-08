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
import { getAllPages } from "../service/api";
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

const AllPages = () => {
  const classes = useStyle();

  const [page, setPage] = useState([]);
  useEffect(() => {
    getPages();
  }, []);

  const getPages = async () => {
    const response = await getAllPages();
    console.log(response.data);
    setPage(response.data);
  };

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.thead}>
          <TableCell>PageId</TableCell>
          <TableCell>JuzId</TableCell>
          <TableCell>JuzName</TableCell>
          <TableCell>FirstSurahName</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {page.map((data) => (
          <TableRow key={data.id} className={classes.trow}>
            <TableCell>{data.page}</TableCell>
            <TableCell>{data.juz}</TableCell>
            <TableCell>{data.juz_name}</TableCell>
            <TableCell>{data.firstSurahName}</TableCell>
            <TableCell>
              <Link
                to={{
                  pathname: `/allAyahs/${data.page}`,
                  query: {
                    id: data.id,
                    page: data.page,
                    juz: data.juz,
                    juz_name: data.juz_name,
                    firstSurahName: data.firstSurahName,
                    firstSurahEngName: data.firstSurahEngName,
                    ayahs: data.ayahs,
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "0px 20px" }}
                >
                  View Ayahs
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllPages;
