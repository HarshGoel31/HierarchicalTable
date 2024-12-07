import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import HierarchicalTable from "./components/Table";

const App = () => {
  const [data, setData] = useState([
    {
      id: "electronics",
      label: "Electronics",
      value: 1500,
      originalValue: 1500,
      variance: 0,
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
          originalValue: 800,
          variance: 0,
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
          originalValue: 700,
          variance: 0,
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      originalValue: 1000,
      variance: 0,
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
          originalValue: 300,
          variance: 0,
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
          originalValue: 700,
          variance: 0,
        },
      ],
    },
  ]);

  const updateValue = (id, newValue, isPercentage) => {
    const updateRows = (rows) => {
      return rows.map((row) => {
        if (row.id === id) {
          const currentValue = row.value;
          const originalValue = row.originalValue;

          row.value = isPercentage
            ? currentValue * (1 + newValue / 100)
            : newValue;

          row.variance = ((row.value - originalValue) / originalValue) * 100;

          if (row.children) {
            const updatedTotal = row.children.reduce(
              (acc, child) => acc + child.value,
              0
            );
            row.children = row.children.map((child) => {
              const contributionPercent = (child.value / updatedTotal) * 100;
              child.value = (row.value * contributionPercent) / 100;
              child.variance =
                ((child.value - child.originalValue) / child.originalValue) *
                100;
              return child;
            });
          }
        } else if (row.children) {
          row.children = updateRows(row.children);
          row.value = row.children.reduce((sum, child) => sum + child.value, 0);
          row.variance =
            ((row.value - row.originalValue) / row.originalValue) * 100;
        }
        return row;
      });
    };

    // Update state with the modified rows
    setData(updateRows(data));
  };

  return (
    <Container sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Hierarchical Table
      </Typography>
      <HierarchicalTable data={data} onValueChange={updateValue} />
    </Container>
  );
};

export default App;
