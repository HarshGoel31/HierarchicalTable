import React, { useState } from "react";
import { TableRow, TableCell, Button, TextField } from "@mui/material";

const TableRowComponent = ({ row, onValueChange, level }) => {
  const [inputValue, setInputValue] = useState("");

  const handlePercentageChange = () => {
    onValueChange(row.id, parseFloat(inputValue), true);
    setInputValue("");
  };

  const handleValueChange = () => {
    onValueChange(row.id, parseFloat(inputValue), false);
    setInputValue("");
  };

  return (
    <>
      <TableRow>
        <TableCell
          sx={{
            paddingLeft: `${level * 20}px`,
            fontWeight: row.children ? "bold" : "normal",
            backgroundColor: row.children ? "#f0f0f0" : "transparent",
          }}
        >
          {row.label}
        </TableCell>
        <TableCell align="center">{row.value.toFixed(2)}</TableCell>
        <TableCell align="center">
          <TextField
            size="small"
            value={inputValue}
            type="number"
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ width: "100px" }}
          />
        </TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handlePercentageChange}
            sx={{ textTransform: "none" }}
          >
            %
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleValueChange}
            sx={{ textTransform: "none" }}
          >
            Set
          </Button>
        </TableCell>
        <TableCell
          align="right"
          sx={{ color: row.variance.toFixed(2) >= 0 ? "green" : "red" }}
        >
          {row.variance.toFixed(2)}%
        </TableCell>
      </TableRow>
      {row?.children &&
        row?.children?.map((child) => (
          <TableRowComponent
            key={child.id}
            row={child}
            onValueChange={onValueChange}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default TableRowComponent;
