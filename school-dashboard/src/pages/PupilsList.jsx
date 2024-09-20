import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PUPILS } from "../graphql/queries";
import { UpdateTeacherDialog } from "./TeacherDialog";
import { List, ListItem, ListItemText } from "@mui/material";

const PupilsList = () => {
  const { loading, error, data } = useQuery(GET_PUPILS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <List>
      {data.pupils.map((pupil) => (
        <ListItem key={pupil.id}>
          <ListItemText primary={pupil.name} />
          {/* <UpdateTeacherDialog teacher={teacher} existingData={teacher} />/ */}
        </ListItem>
      ))}
    </List>
  );
};

export { PupilsList };
