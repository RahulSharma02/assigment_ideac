import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TableFooter,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Employee, tableProps } from "../../utils/types";
import ConfirmationModal from "../UI/ConfirmationModal";
import { capitalizeFirstLetter } from "../../utils/helpers";
import TooltipIconButton from "../UI/IconButton";

const columns = [
  { label: "Name", field: "name" },
  { label: "Salary ₹", field: "salary" },
  { label: "Gender", field: "gender" },
  { label: "Experience", field: "experience" },
  { label: "Country", field: "country" },
  { label: "Job Title", field: "jobTitle" },
];

const UserTable: React.FC<tableProps> = ({
  users,
  onEdit,
  onDelete,
  onCopy,
  onSort,
}) => {
  const [openModal, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  // Function to handle delete icon click
  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setModalOpen(true);
  };

  // Function to confirm the delete action
  const handleConfirmDelete = () => {
    if (userToDelete !== null) {
      // debugger
      onDelete(userToDelete);
      setModalOpen(false);
      setUserToDelete(null);
    }
  };

  // Calculate the total salary
  const totalSalary = users.reduce((acc, user) => acc + user.salary, 0);

  return (
    <>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        header="Delete Confirmation"
        bodyText="Are you sure you want to delete this user?"
        openModal={openModal}
        closeModal={() => setModalOpen(false)}
        onYesClick={handleConfirmDelete}
      />

      {/* Table displaying users */}
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    onClick={() => onSort(column.field as keyof Employee)}
                    sx={{ cursor: "pointer" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.salary}</TableCell>
                  <TableCell>{capitalizeFirstLetter(user.gender)}</TableCell>
                  <TableCell>{`${user.experience} years`}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>{user.jobTitle}</TableCell>
                  <TableCell>
                    <TooltipIconButton
                      icon={<EditIcon />}
                      tooltipTitle="Edit"
                      onClick={() => onEdit(user)}
                    />

                    <TooltipIconButton
                      icon={<DeleteIcon />}
                      tooltipTitle="Delete"
                      onClick={() => handleDeleteClick(user.id)}
                    />

                    <TooltipIconButton
                      icon={<FileCopyIcon />}
                      tooltipTitle="Copy"
                      onClick={() => onCopy(user)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Summary:</TableCell>
                <TableCell>₹{totalSalary}</TableCell>
                <TableCell colSpan={3} />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserTable;
