import React from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  makeStyles,
  Button,
} from "@material-ui/core";
import data from "../Database/juz.json";
import { Link } from "react-router-dom";
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

const AllJuz = () => {
  const classes = useStyle();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.thead}>
          <TableCell>JuzId</TableCell>
          <TableCell>JuzName</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((d) => (
          <TableRow key={d.juz} className={classes.trow}>
            <TableCell>{d.juz}</TableCell>
            <TableCell>{d.juz_name}</TableCell>
            <TableCell>
              <Link
                to={{
                  pathname: `/allPages/${d.juz}`,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "0px 20px" }}
                >
                  View Pages
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllJuz;
