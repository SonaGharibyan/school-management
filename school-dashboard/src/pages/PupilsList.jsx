import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PUPILS } from "../graphql/queries";
// import { PupilDialog } from "./PupilDialog";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DELETE_PUPIL } from "../graphql/mutations";
import DeleteIcon from "@mui/icons-material/Delete";

const PupilsList = () => {
  const { data, loading, error } = useQuery(GET_PUPILS);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPupil, setSelectedPupil] = useState(null);
  const [deletePupil] = useMutation(DELETE_PUPIL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEditClick = (pupil) => {
    setSelectedPupil(pupil);
    setOpenDialog(true);
  };

  const handleCreateClick = () => {
    setSelectedPupil(null);
    setOpenDialog(true);
  };

  return (
    <div>
      <h2>Pupils List</h2>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Create Pupil
      </Button>
      <List>
        {data.pupils.map((pupil) => (
          <ListItem
            key={pupil.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deletePupil({ variables: { id: pupil.id } })}
                >
                  <DeleteIcon />
                </IconButton>
                <Button onClick={() => handleEditClick(pupil)}>Edit</Button>
              </>
            }
          >
            <ListItemText primary={pupil.name} />
          </ListItem>
        ))}
      </List>

      {/* <PupilDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        pupil={selectedPupil}
      /> */}
    </div>
  );
};

export { PupilsList };
