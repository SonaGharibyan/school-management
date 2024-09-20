import React from "react";
import { TeachersList } from "./TeachersList";
import { withAuth } from "./withAuth";
import { PupilsList } from "./PupilsList";
import { SubjectsList } from "./SubjectsList";

const DashboardInner = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <TeachersList />
      <PupilsList />
      <SubjectsList />
    </div>
  );
};

const Dashboard = withAuth(DashboardInner);
export { Dashboard };
