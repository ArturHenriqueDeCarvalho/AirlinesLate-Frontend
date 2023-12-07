import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../UploadPage/style.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleFileUpload = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log("File uploaded successfully:", responseData.filePath);
            // Pode adicionar lógica adicional, se necessário
            navigate("/exhibition", {
              state: { csvData: responseData.filePath },
            });
          } else {
            console.error(
              "Erro ao fazer upload do arquivo:",
              response.statusText
            );
            // Lidar com erro, se necessário
          }
        } catch (error) {
          console.error("Erro ao fazer upload do arquivo:", error);
          // Lidar com erro, se necessário
        }
      }
    };

    handleFileUpload();
  }, [file, navigate]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="upload-page">
      <div className="upload-page-content">
        <div className="center-content">
          <h1 className="upload-text">Envie a planilha para a análise</h1>
          <Button
            className="upload-button"
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            style={{ width: "200px", height: "50px" }}
          >
            ENVIAR ARQUIVO
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
        </div>
      </div>
      <div className="upload-page-background" />
    </div>
  );
};

export default UploadPage;
