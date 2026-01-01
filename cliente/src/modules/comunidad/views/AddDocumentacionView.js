import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Drawer from "../../../components/Drawer";
import documentacionService from '../../../services/documentacionService';
import { useMenu } from '../../../components/base/MenuContext';

const AddDocumentacion = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [fechaEmision, setFechaEmision] = useState("");
  const [fechaRecepcion, setFechaRecepcion] = useState("");
  const [estado, setEstado] = useState("Activa");
  const [selectedFile, setSelectedFile] = useState(null);
  const [observaciones, setObservaciones] = useState("");
  const navigate = useNavigate();
  const { setCurrentMenu } = useMenu();
  const [tipoDocumentacion, setTipoDocumentacion] = useState([]);
  const [selectedTipoDocumentacion, setSelectedTipoDocumentacion] = useState("");


  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    setCurrentMenu('Agregar Documentación');
    documentacionService.getTipoDocumentacion().then((response) => {
      setTipoDocumentacion(response.data);
    });
  }, [setCurrentMenu]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('codigo_documentacion', codigo);
    formData.append('nombre_documentacion', nombre);
    formData.append('descripcion_documentacion', descripcion);
    formData.append('fecha_emision_documentacion', fechaEmision);
    formData.append('fecha_recepcion_documentacion', fechaRecepcion);
    formData.append('estado_documentacion', estado);
    formData.append('observaciones_documentacion', observaciones);
    formData.append('id_tipo_documentacion', selectedTipoDocumentacion);
    
    if (selectedFile) {
      formData.append('archivo_url_documentacion', selectedFile);
    }

    try {
      documentacionService.createDocumentacion(formData).then(() => {
      navigate(-1);
      }); 
    } catch (error) {
      console.error("Error al crear la documentación:", error);
    }
    
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
      <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { md: `calc(100% - 240px)` },
          mt: { xs: 7, sm: 8 }, // Adjust margin-top to account for AppBar height
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            fontSize: { xs: "1.5rem", md: "2rem" },
            color: "primary.main",
          }}
        >
          Agregar Documentación
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Codigo"
            fullWidth
            sx={{ mb: 2 }}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          /> 
          <TextField
            label="Nombre"
            fullWidth
            sx={{ mb: 2 }}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          /> 
          <TextField
            label="Descripción"
            fullWidth
            sx={{ mb: 2 }}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <TextField
            label="Fecha de Emisión"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            value={fechaEmision}
            onChange={(e) => setFechaEmision(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Fecha de Recepción"
            type="date"
            fullWidth
            sx={{ mb: 2 }}
            value={fechaRecepcion}
            onChange={(e) => setFechaRecepcion(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <MenuItem value="Activa">Activa</MenuItem>
              <MenuItem value="Inactiva">Inactiva</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              component="label"
            >
              Subir Archivo
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {selectedFile && <Typography sx={{ ml: 2, display: 'inline' }}>{selectedFile.name}</Typography>}
          </Box>
          <TextField
            label="Observaciones"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Tipos de Documentación</InputLabel>
                      <Select
                        value={selectedTipoDocumentacion}
                        onChange={(e) => setSelectedTipoDocumentacion(e.target.value)}
                      >
                        {tipoDocumentacion.map((tipo) => (
                          <MenuItem key={tipo.id_tipo_documentacion} value={tipo.id_tipo_documentacion}>
                            {tipo.nombre_tipo_documentacion}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddDocumentacion;
