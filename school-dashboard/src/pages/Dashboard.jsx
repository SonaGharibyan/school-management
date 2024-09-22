import React from "react";
import { TeachersList } from "./TeachersList";
import { withAuth } from "./withAuth";
import { PupilsList } from "./PupilsList";
import { SubjectsList } from "./SubjectsList";
import { Container, Box, Typography } from "@mui/material";

const DashboardInner = () => {
  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          Dashboard
        </Typography>
        <Box mb={4}>
          <TeachersList />
        </Box>
        <Box mb={4}>
          <PupilsList />
        </Box>
        <Box mb={4}>
          <SubjectsList />
        </Box>
      </Box>
    </Container>
  );
};

const Dashboard = withAuth(DashboardInner);
export { Dashboard };
