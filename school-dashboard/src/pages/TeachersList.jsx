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
  Typography,
  Container,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { DELETE_TEACHER } from "../graphql/mutations";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const TeachersList = () => {
  const { data, loading, error, refetch } = useQuery(GET_TEACHERS);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [deleteTeacher] = useMutation(DELETE_TEACHER);

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenDialog(true);
  };

  const handleCreateClick = () => {
    setSelectedTeacher(null);
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h4">Teachers List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Create Teacher
        </Button>
      </Box>

      <List>
        {data.teachers.map((teacher) => (
          <div key={teacher.id}>
            <ListItem>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={8}>
                  <ListItemText
                    primary={
                      <Typography variant="h6">{teacher.name}</Typography>
                    }
                    secondary={
                      <Typography variant="body2">
                        Subjects:{" "}
                        {teacher.subjects
                          ?.map((subject) => subject.name)
                          .join(", ")}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="flex-end">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(teacher)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() =>
                      deleteTeacher({ variables: { id: teacher.id } }).then(
                        () => refetch()
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
            <Divider variant="middle" />
          </div>
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
    </Container>
  );
};

export { TeachersList };
