import { Employee } from "../../utils/types";

const initialData = [
  {
    id: 1,
    name: "Vivek",
    salary: 55000,
    gender: "male",
    country: "India",
    experience: 3,
    jobTitle: "UI designer",
    agreeTerms: true,
  },
  {
    id: 2,
    name: "Devin",
    salary: 50000,
    gender: "male",
    country: "USA",
    experience: 7,
    jobTitle: "Backend Developer",
    agreeTerms: true,
  },
  {
    id: 3,
    name: "Priya",
    salary: 75000,
    gender: "female",
    country: "India",
    experience: 2,
    jobTitle: "Frontend Developer",
    agreeTerms: true,
  },
  {
    id: 4,
    name: "Rahul",
    salary: 95000,
    gender: "male",
    country: "India",
    experience: 3.9,
    jobTitle: "BlockChain",
    agreeTerms: true,
  },
  {
    id: 5,
    name: "Itika",
    salary: 150000,
    gender: "female",
    country: "USA",
    experience: 8,
    jobTitle: "AI ML",
    agreeTerms: true,
  },
  {
    id: 6,
    name: "John",
    salary: 115000,
    gender: "male",
    country: "USA",
    experience: 5.5,
    jobTitle: "Team Lead",
    agreeTerms: true,
  },
];

const sortUsers = (
  users: Employee[],
  field: keyof Employee,
  sortedField: string | null
): Employee[] => {
  const sortedUsers = [...users];
  if (sortedField === field) {
    return sortedUsers.reverse(); // Reverse if already sorted by this field
  } else {
    return sortedUsers.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }
};

// utils/filterUtils.ts
const filterUsers = (users: Employee[], searchTerm: string): Employee[] => {
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// utils/paginationUtils.ts
const paginateUsers = (
  users: Employee[],
  currentPage: number,
  usersPerPage: number
): Employee[] => {
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  return users.slice(startIndex, endIndex);
};

export { initialData, sortUsers, filterUsers, paginateUsers };
