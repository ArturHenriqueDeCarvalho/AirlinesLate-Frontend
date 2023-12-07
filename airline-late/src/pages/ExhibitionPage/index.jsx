import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import "./style.css";

const Exhibition = () => {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch("http://localhost:5000/uploadedData");
        const data = await response.json();

        setFlightData(data);
      } catch (error) {
        console.error("Erro ao carregar dados da API:", error);
      }
    };

    fetchCSVData();
  }, []);

  return (
    <div className="exhibition-page-background">
      <div className="form-exhibition">
        <Container
          maxWidth="lg"
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" gutterBottom>
            DADOS EXTRAÍDOS
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {flightData.length > 0 &&
                    Object.keys(flightData[0]).map((header) => (
                      <TableCell key={header}>{header}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {flightData.map((flight, index) => (
                  <TableRow key={index}>
                    {Object.values(flight).map((value, index) => (
                      <TableCell key={index}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </div>
  );
};

export default Exhibition;
