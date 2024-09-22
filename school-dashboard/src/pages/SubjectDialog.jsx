import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SUBJECT, UPDATE_SUBJECT } from "../graphql/mutations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GET_TEACHERS } from "../graphql/queries";

const SubjectDialog = ({ open, onClose, subject }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const { data: teacherData, loading: teacherLoading } = useQuery(GET_TEACHERS);

  const [addSubject] = useMutation(ADD_SUBJECT);
  const [updateSubject] = useMutation(UPDATE_SUBJECT);

  useEffect(() => {
    if (subject?.id) {
      setName(subject.name);
      setGrade(subject.grade);
      setSelectedTeacher(subject.teacher?.id);
    }
  }, [subject]);

  const handleSubmit = async () => {
    if (subject?.id) {
      await updateSubject({
        variables: {
          id: subject.id,
          data: {
            name,
            grade: parseInt(grade),
            teacherId: selectedTeacher,
          },
        },
      });
    } else {
      await addSubject({
        variables: {
          data: {
            name,
            grade: parseInt(grade),
            teacherId: selectedTeacher,
          },
        },
      });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {subject?.id ? "Update Subject" : "Create Subject"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Subject Name"
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Teacher</InputLabel>
          <Select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            label="Teacher"
            disabled={teacherLoading}
          >
            {teacherData?.teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {subject?.id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { SubjectDialog };
