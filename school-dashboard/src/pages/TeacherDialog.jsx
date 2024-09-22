import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TEACHER, UPDATE_TEACHER } from "../graphql/mutations";
import { GET_SUBJECTS } from "../graphql/queries";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";

const TeacherDialog = ({ open, onClose, teacher }) => {
  const [name, setName] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const { data: subjectsData } = useQuery(GET_SUBJECTS);
  const [createTeacher] = useMutation(ADD_TEACHER);
  const [updateTeacher] = useMutation(UPDATE_TEACHER);

  useEffect(() => {
    if (teacher) {
      setName(teacher.name);
      setSelectedSubjects(teacher.subjects?.map((subject) => subject.id) || []);
    } else {
      setName("");
      setSelectedSubjects([]);
    }
  }, [teacher]);

  const handleSubjectsChange = (event) => {
    setSelectedSubjects(event.target.value);
  };

  const handleSubmit = async () => {
    const variables = {
      name,
      subjectIds: selectedSubjects,
    };

    if (teacher) {
      await updateTeacher({
        variables: { id: teacher.id, data: variables },
      });
    } else {
      await createTeacher({
        variables: { data: variables },
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{teacher ? "Update Teacher" : "Create Teacher"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Teacher Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Subjects</InputLabel>
          <Select
            multiple
            value={selectedSubjects}
            onChange={handleSubjectsChange}
            renderValue={(selected) => {
              return subjectsData?.subjects
                .map((subject) => subject.name)
                .join(", ");
            }}
          >
            {subjectsData?.subjects.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>
                <Checkbox checked={selectedSubjects.includes(subject.id)} />
                <ListItemText primary={subject.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          {teacher ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { TeacherDialog };
