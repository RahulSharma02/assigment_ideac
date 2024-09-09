import React, { useState, useMemo, useCallback } from "react";
import EmployeeTable from "../../components/Employee/EmployeeTable";
import {
  Grid2 as Grid,
  Typography,
  TextField,
  Pagination,
} from "@mui/material";
import Button from "../../components/UI/Button";
import { Employee } from "../../utils/types";
import { toast } from "react-toastify";
import { initialData, sortUsers, filterUsers, paginateUsers } from "./helpers";
import EmployeeModal from "../../components/Employee/EmployeeModal"; // Import the new EmployeeModal component

const EmployeeModule = () => {
  const [users, setUsers] = useState<Employee[]>(initialData);
  const [sortedField, setSortedField] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openUserModal, setOpenUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 5; // Number of users per page

  // console.log('users', users);

  // Add or Edit user function
  const handleFormSubmit = (newUser: Employee) => {
    if (currentUser) {
      // Edit user
      setUsers(
        users.map((user) => (user.id === currentUser.id ? newUser : user))
      );
      toast.success("Employee record updated successfully!");
    } else {
      // Add user
      setUsers([...users, { ...newUser, id: Date.now() }]);
      toast.success("Employee record added successfully!");
    }
    setOpenUserModal(false);
    setCurrentUser(null); // Reset after submission
  };

  // Handle sorting
  const handleSorting = useCallback(
    (field: keyof Employee) => {
      const sortedUsers = sortUsers(users, field, sortedField);
      setUsers(sortedUsers);
      setSortedField(field);
    },
    [users, sortedField]
  );

  const filteredUsers = useMemo(
    () => filterUsers(users, searchTerm),
    [users, searchTerm]
  );

  const paginatedUsers = useMemo(
    () => paginateUsers(filteredUsers, currentPage, usersPerPage),
    [filteredUsers, currentPage]
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Handle opening the modal for adding a new user
  const handleAddUser = () => {
    setCurrentUser(null);
    setOpenUserModal(true);
  };

  // Handle opening the modal for editing an existing user
  const handleEditUser = (user: Employee) => {
    setCurrentUser(user);
    setOpenUserModal(true);
  };

  // Handle deleting a user
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.error("Employee record deleted successfully!");
  };

  // Handle copying a user
  const handleCopyUser = (user: Employee) => {
    const copiedUser = { ...user, id: Date.now() };
    setUsers([...users, copiedUser]);
    toast.success("Employee record copied successfully!");
  };

  return (
    <>
      <Grid container spacing={4} sx={{ padding: 4, margin: 4 }}>
        <Grid size={10}>
          <Typography variant="h6">Employee Management</Typography>
        </Grid>
        <Grid size={2}>
          <Button
            text="Add Employee"
            handleClick={handleAddUser}
            size="medium"
          />
        </Grid>

        {/* Search Field */}
        <Grid size={12}>
          <TextField
            label="Search by Name or Country"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "20vw" }}
          />
          <Button
            handleClick={() => setSearchTerm("")}
            text="clear"
            sx={{ margin: "0 0 0 12px", padding: "15px 24px" }}
          />
        </Grid>

        <Grid size={12}>
          <EmployeeTable
            users={paginatedUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onCopy={handleCopyUser}
            onSort={handleSorting}
          />
        </Grid>

        {/* Pagination Component */}
        <Grid size={12}>
          <Pagination
            count={Math.ceil(filteredUsers.length / usersPerPage)} // Total pages
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
      </Grid>

      {/* Use the EmployeeModal component */}
      <EmployeeModal
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        onSubmit={handleFormSubmit}
        currentUser={currentUser}
      />
    </>
  );
};

export default EmployeeModule;
