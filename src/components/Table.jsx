import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableRowComponent from "./TableRow";

const HierarchicalTable = ({ data, onValueChange }) => {
  const calculateTotal = (rows) =>
    rows.reduce((acc, row) => acc + row.value, 0);

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 3,
        mx: "auto",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <strong>Label</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Value</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Input</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Allocation %</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Allocation Val</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Variance %</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRowComponent
              key={row.id}
              row={row}
              onValueChange={onValueChange}
              level={1}
            />
          ))}
          <TableRow sx={{ backgroundColor: "#e0f7fa" }}>
            <TableCell>
              <strong>Grand Total</strong>
            </TableCell>
            <TableCell align="center">
              <strong>{calculateTotal(data).toFixed(2)}</strong>
            </TableCell>
            <TableCell colSpan={4}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HierarchicalTable;
