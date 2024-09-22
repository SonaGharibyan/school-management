import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TEACHERS } from "../graphql/queries";
import { TeacherDialog } from "./TeacherDialog";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DELETE_TEACHER } from "../graphql/mutations";
import DeleteIcon from "@mui/icons-material/Delete";

const TeachersList = () => {
  const { data, loading, error, refetch } = useQuery(GET_TEACHERS);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [deleteTeacher] = useMutation(DELETE_TEACHER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenDialog(true);
  };

  const handleCreateClick = () => {
    setSelectedTeacher(null);
    setOpenDialog(true);
  };

  return (
    <div>
      <h2>Teachers List</h2>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Create Teacher
      </Button>
      <List>
        {data.teachers.map((teacher) => (
          <ListItem
            key={teacher.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() =>
                    deleteTeacher({ variables: { id: teacher.id } }).then(() =>
                      refetch()
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
                <Button onClick={() => handleEditClick(teacher)}>Edit</Button>
              </>
            }
          >
            <ListItemText
              primary={teacher.name}
              secondary={`Subjects: ${teacher.subjects?.map(
                (subject) => subject.name
              )}`}
            />
          </ListItem>
        ))}
      </List>

      <TeacherDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          refetch();
        }}
        teacher={selectedTeacher}
      />
    </div>
  );
};

export { TeachersList };
