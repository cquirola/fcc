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
import normativaServices from '../../../services/normativasService';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useMenu } from '../../../components/base/MenuContext';
import PersonaInteraccionesSummary from '../components/PersonaInteraccionesSummary';

const Normativa = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [normativas, setNormativas] = useState([]);
  const [expandedPersonId, setExpandedPersonId] = useState(null);
  const navigate = useNavigate();
  const { setCurrentMenu } = useMenu();

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const fetchNormativas = () => {
    normativaServices.getNormativas().then((response) => {
      setNormativas(response.data);
    });
  };

  useEffect(() => {
    setCurrentMenu('Normativas');
    fetchNormativas();
  }, [setCurrentMenu]);

  const handleExpandClick = (personId) => {
    setExpandedPersonId(expandedPersonId === personId ? null : personId);
  };

  const handleDelete = (id) => {
    normativaServices.deleteNormativa(id).then(() => {
      fetchNormativas();
    });
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
          Normativas de la Comunidad
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 4 }}
          onClick={() => navigate("/fcc-comunidad/")}
        >
          Agregar Normativa
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tipo Permiso</TableCell>
                <TableCell>Numero de Resolución y Registro</TableCell>
                <TableCell>Entidad Reguladora</TableCell>
                <TableCell> Estado de Cumplimiento</TableCell>
                <TableCell>Categoria de riesgo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {normativas.map((normativa) => (
                <React.Fragment key={normativa.id_normativa}>
                  <TableRow>
                    <TableCell>{normativa.tipo_permiso}</TableCell>
                    <TableCell>{normativa.nmro_resolucion_registro}</TableCell>
                    <TableCell>{normativa.entidad_reguladora}</TableCell>
                    <TableCell>{normativa.estado_cumplimiento}</TableCell>
                    <TableCell>{normativa.categoria_riesgo}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => navigate(`/fcc-comunidad/personas/${normativa.id_normativa}/detalles`)}
                      >
                        Detalles
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => navigate(`/fcc-comunidad/personas/${normativa.id_normativa}/editar`)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(normativa.id_normativa)}
                      >
                        Eliminar
                      </Button>
                      <IconButton
                        onClick={() => handleExpandClick(normativa.id_normativa)}
                      >
                        {expandedPersonId === normativa.id_normativa ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={expandedPersonId === normativa.id_normativa} timeout="auto" unmountOnExit>
                        <PersonaInteraccionesSummary personaId={normativa.id_normativa} />
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

export default Normativa;
