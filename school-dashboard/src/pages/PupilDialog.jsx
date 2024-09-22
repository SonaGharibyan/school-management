import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PUPIL, UPDATE_PUPIL } from "../graphql/mutations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const PupilDialog = ({ open, onClose, pupil }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const [addPupil] = useMutation(ADD_PUPIL);
  const [updatePupil] = useMutation(UPDATE_PUPIL);

  useEffect(() => {
    if (pupil?.id) {
      setName(pupil.name);
      setGrade(pupil.grade);
    }
  }, [pupil]);

  const handleSubmit = async () => {
    if (pupil?.id) {
      await updatePupil({
        variables: {
          id: pupil.id,
          data: {
            name,
            grade: parseInt(grade),
          },
        },
      });
    } else {
      await addPupil({
        variables: {
          data: {
            name,
            grade: parseInt(grade),
          },
        },
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{pupil?.id ? "Update Pupil" : "Create Pupil"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Pupil Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Grade"
          fullWidth
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {pupil?.id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { PupilDialog };
