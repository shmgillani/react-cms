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
import j from "../Database/juz.json";
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

const AllPages = () => {
  const classes = useStyle();
  const { query } = useLocation();

  const [page, setPage] = useState([]);
  useEffect(() => {
    getPages();
  }, []);

  const getPages = async () => {
    const response = await getAllPages();
    const res = response.data.filter((element)=> element.juz == query.juzId);
    // console.log("-----------------------", res);
    setPage(res);
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
        {page.map((e) => (
          <TableRow key={e.id} className={classes.trow}>
            <TableCell>{e.page}</TableCell>
            <TableCell>{e.juz}</TableCell>
            <TableCell>{e.juz_name}</TableCell>
            <TableCell>{e.firstSurahName}</TableCell>
            <TableCell>
              <Link
                to={{
                  pathname: `/allAyahs/${e.page}`,
                  query: {
                    id: e.id,
                    page: e.page,
                    juz: e.juz,
                    juz_name: e.juz_name,
                    firstSurahName: e.firstSurahName,
                    firstSurahEngName: e.firstSurahEngName,
                    ayahs: e.ayahs,
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
