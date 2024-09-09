import React from "react";
import {
  Grid2 as Grid,
  Typography,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UserForm from "./AddEditEmployeeForm";
import { Employee } from "../../utils/types";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: Employee) => void;
  currentUser: Employee | null;
}

const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  onSubmit,
  currentUser,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          margin: "auto",
          marginTop: "2%",
          maxWidth: 500,
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid size={10}>
            <Typography variant="h6" gutterBottom>
              {currentUser ? "Edit Employee" : "Add New Employee"}
            </Typography>
          </Grid>
          <Grid size={2} textAlign="right">
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* User Form */}
        <UserForm onSubmit={onSubmit} Employee={currentUser} />
      </Box>
    </Modal>
  );
};

export default UserModal;
