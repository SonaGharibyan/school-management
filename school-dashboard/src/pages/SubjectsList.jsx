import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SUBJECTS, GET_TEACHERS } from "../graphql/queries";
// import { SubjectDialog } from "./SubjectDialog";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DELETE_SUBJECT } from "../graphql/mutations";
import DeleteIcon from "@mui/icons-material/Delete";

const SubjectsList = () => {
  const { data, loading, error } = useQuery(GET_SUBJECTS);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [deleteSubject] = useMutation(DELETE_SUBJECT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEditClick = (subject) => {
    setSelectedSubject(subject);
    setOpenDialog(true);
  };

  const handleCreateClick = () => {
    setSelectedSubject(null);
    setOpenDialog(true);
  };

  return (
    <div>
      <h2>Subjects List</h2>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Create Subject
      </Button>
      <List>
        {data.subjects.map((subject) => (
          <ListItem
            key={subject.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() =>
                    deleteSubject({ variables: { id: subject.id } })
                  }
                >
                  <DeleteIcon />
                </IconButton>
                <Button onClick={() => handleEditClick(subject)}>Edit</Button>
              </>
            }
          >
            <ListItemText primary={subject.name} />
          </ListItem>
        ))}
      </List>

      {/* <SubjectDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        subject={selectedSubject}
      /> */}
    </div>
  );
};

export { SubjectsList };
