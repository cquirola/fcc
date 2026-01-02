import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Drawer from "../../../components/Drawer";
import documentacionService from "../../../services/documentacionService";
import { useMenu } from "../../../components/base/MenuContext";
import { API_IMAGE_URL } from "../../../services/apiConfig";

const DetalleDocumentacionView = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [documentacion, setDocumentacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentMenu } = useMenu();

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    setCurrentMenu('Detalle de Documentación');

    const fetchDocumentacion = async () => {
      try {
        setLoading(true);
        const response = await documentacionService.getDocumentacionById(id);
        setDocumentacion(response.data);
      } catch (err) {
        console.error('Error al cargar los detalles de la documentación:', err);
        setError('Error al cargar los detalles de la documentación.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentacion();
  }, [id, setCurrentMenu]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
        <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Box>
    );
  }

  if (!documentacion) {
    return (
      <Box sx={{ display: "flex" }}>
        <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
        <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Alert severity="info">Documentación no encontrada.</Alert>
        </Box>
      </Box>
    );
  }

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
          mt: { xs: 7, sm: 8 },
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
          Detalle de Documentación: {documentacion.nombre_documentacion}
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>Información General</Typography>
          <Typography><strong>ID:</strong> {documentacion.id_documentacion}</Typography>
          <Typography><strong>Código:</strong> {documentacion.codigo_documentacion}</Typography>
          <Typography><strong>Nombre:</strong> {documentacion.nombre_documentacion}</Typography>
          <Typography><strong>Descripción:</strong> {documentacion.descripcion_documentacion}</Typography>
          <Typography><strong>Tipo de documento:</strong> {documentacion.id_tipo_documentacion}</Typography>
          <Typography><strong>Fecha de emisión:</strong> {formatDate(documentacion.fecha_emision_documentacion)}</Typography>
          <Typography><strong>Fecha de recepción:</strong> {formatDate(documentacion.fecha_recepcion_documentacion)}</Typography>
          <Typography><strong>Estado:</strong> {documentacion.estado_documentacion}</Typography>
          <Typography><strong>Observaciones:</strong> {documentacion.observaciones_documentacion || 'N/A'}</Typography>
          <Typography component="div" sx={{ mt: 2 }}>
            <strong>Archivo:</strong>{' '}
            {documentacion.archivo_url_documentacion ? (
              <a
                href={`${API_IMAGE_URL}${documentacion.archivo_url_documentacion}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver archivo
              </a>
            ) : (
              'N/A'
            )}
          </Typography>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => navigate(-1)}
        >
          Volver a Documentaciones
        </Button>
      </Box>
    </Box>
  );
};

export default DetalleDocumentacionView;
