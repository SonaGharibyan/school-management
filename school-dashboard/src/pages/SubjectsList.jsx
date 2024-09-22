import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SUBJECTS } from "../graphql/queries";
import { SubjectDialog } from "./SubjectDialog";
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
import { DELETE_SUBJECT } from "../graphql/mutations";

const SubjectsList = () => {
  const { data, loading, error, refetch } = useQuery(GET_SUBJECTS);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [deleteSubject] = useMutation(DELETE_SUBJECT);

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const handleEditClick = (subject) => {
    setSelectedSubject(subject);
    setOpenDialog(true);
  };

  const handleCreateClick = () => {
    setSelectedSubject(null);
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h4">Subjects List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
        >
          Create Subject
        </Button>
      </Box>

      <List>
        {data.subjects.map((subject) => (
          <div key={subject.id}>
            <ListItem>
              <Box
                display="flex"
                width="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <ListItemText
                  primary={<Typography variant="h6">{subject.name}</Typography>}
                  secondary={
                    <Typography variant="body2">
                      Grade: {subject.grade} Teacher: {subject.teacher?.name}
                    </Typography>
                  }
                />
                <Box>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(subject)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() =>
                      deleteSubject({ variables: { id: subject.id } }).then(
                        () => refetch()
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

      <SubjectDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          refetch();
        }}
        subject={selectedSubject}
      />
    </Container>
  );
};

export { SubjectsList };
