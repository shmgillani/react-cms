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
import { Link, useParams } from "react-router-dom";
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
  // const { params } = useLocation();
  const params = useParams();

  const [pages, setPage] = useState([]);

  const getPages = async () => {
    const response = await getAllPages();
    // console.log("+++++++++++++++++++++++++++", res);
    return response;
  };

  // console.log("+++++++++++++++++++++", pages);

  useEffect(async () => {
    let res = await getPages();
    // console.log("================================", res);
    localStorage.setItem(
      "pages",
      JSON.stringify(res.data.filter((element) => element.juz == params.juzId))
    );
  }, [pages]);

  useEffect(() => {
    setPage(JSON.parse(localStorage.getItem("pages")));
  }, []);
  

  // console.log("====================================", pages);

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
        {pages.map((e) => (
          <TableRow key={e.id} className={classes.trow}>
            <TableCell>{e.page}</TableCell>
            <TableCell>{e.juz}</TableCell>
            <TableCell>{e.juz_name}</TableCell>
            <TableCell>{e.firstSurahName}</TableCell>
            <TableCell>
              <Link
                to={{
                  pathname: `/allAyahs/${e.page}`,
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
