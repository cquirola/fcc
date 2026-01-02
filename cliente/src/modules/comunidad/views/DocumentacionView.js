import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Drawer from "../../../components/Drawer";
import documentacionService from '../../../services/documentacionService';
import { API_IMAGE_URL } from '../../../services/apiConfig';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useMenu } from '../../../components/base/MenuContext';
import InteraccionPersonasSummary from '../components/InteraccionPersonasSummary';

const Documentaciones = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [documentaciones, setDocumentaciones] = useState([]);
  const [expandedInteraccionId, setExpandedInteraccionId] = useState(null);
  const navigate = useNavigate();
  const { setCurrentMenu } = useMenu();

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const fetchDocumentaciones = () => {
    documentacionService.getDocumentaciones().then((response) => {
      setDocumentaciones(response.data);
    });
  };

  useEffect(() => {
    setCurrentMenu('Documentaciones');
    fetchDocumentaciones();
  }, [setCurrentMenu]);

  const handleExpandClick = (interaccionId) => {
    setExpandedInteraccionId(expandedInteraccionId === interaccionId ? null : interaccionId);
  };

  const handleDelete = (id) => {
    try {
      documentacionService.deleteDocumentacion(id).then(() => {
        fetchDocumentaciones();
      });
    } catch (error) {
      console.error("Error al eliminar la documentación:", error);
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
          Documentación de la Comunidad
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 4 }}
          onClick={() => navigate("/fcc-comunidad/documentacion/nueva")}
        >
          Agregar Documentación
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Tipo de documento</TableCell>
                <TableCell>Fecha Emisión</TableCell>
                <TableCell>Fecha Recepción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Archivo URL</TableCell>
                <TableCell>Observaciones</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documentaciones.map((documentacion) => (
                <React.Fragment key={documentacion.id_documentacion}>
                  <TableRow>
                    <TableCell>{documentacion.codigo_documentacion}</TableCell>
                    <TableCell>{documentacion.nombre_documentacion}</TableCell>
                    <TableCell>{documentacion.descripcion_documentacion}</TableCell>
                    <TableCell>{documentacion.id_tipo_documentacion}</TableCell>
                    <TableCell>{new Date(documentacion.fecha_emision_documentacion).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(documentacion.fecha_recepcion_documentacion).toLocaleDateString()}</TableCell>
                    <TableCell>{documentacion.estado_documentacion}</TableCell>
                    <TableCell>
                      {documentacion.archivo_url_documentacion ? (
                        <a
                          href={`${API_IMAGE_URL}${documentacion.archivo_url_documentacion}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver archivo
                        </a>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell>{documentacion.observaciones_documentacion}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => navigate(`/fcc-comunidad/documentacion/${documentacion.id_documentacion}/detalles`)}
                      >
                        Detalles
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => navigate(`/fcc-comunidad/documentacion/${documentacion.id_documentacion}/editar`)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(documentacion.id_documentacion)}
                      >
                        Eliminar
                      </Button>
                      <IconButton
                        onClick={() => handleExpandClick(documentacion.id_documentacion)}
                      >
                        {expandedInteraccionId === documentacion.id_documentacion ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                      <Collapse in={expandedInteraccionId === documentacion.id_documentacion} timeout="auto" unmountOnExit>
                        <InteraccionPersonasSummary interaccionId={documentacion.id_documentacion} />
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Documentaciones;
