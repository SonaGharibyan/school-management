import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PUPILS } from "../graphql/queries";
import { PupilDialog } from "./PupilDialog";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DELETE_PUPIL } from "../graphql/mutations";

const PupilsList = () => {
  const { data, loading, error, refetch } = useQuery(GET_PUPILS);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPupil, setSelectedPupil] = useState(null);
  const [deletePupil] = useMutation(DELETE_PUPIL);

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const handleEditClick = (pupil) => {
    setSelectedPupil(pupil);
    setOpenDialog(true);
  };

  const handleCreateClick = () => {
    setSelectedPupil(null);
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h4">Pupils List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Create Pupil
        </Button>
      </Box>

      <List>
        {data.pupils.map((pupil) => (
          <div key={pupil.id}>
            <ListItem>
              <Box
                display="flex"
                width="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <ListItemText
                  primary={<Typography variant="h6">{pupil.name}</Typography>}
                  secondary={
                    <Typography variant="body2">
                      Grade: {pupil.grade}
                    </Typography>
                  }
                />
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(pupil)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() =>
                      deletePupil({ variables: { id: pupil.id } }).then(() =>
                        refetch()
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
            <Divider variant="middle" />
          </div>
        ))}
      </List>

      <PupilDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          refetch();
        }}
        pupil={selectedPupil}
      />
    </Container>
  );
};

export { PupilsList };
