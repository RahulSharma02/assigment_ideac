type Employee = {
  id: number;
  name: string;
  salary: number;
  gender: string;
  country: string;
  agreeTerms: boolean;
  experience: number;
  jobTitle: string;
};

type formProps = {
  value: string;
};

type tableProps = {
  users: Employee[];
  onEdit: (user: Employee) => void;
  onDelete: (id: number) => void;
  onCopy: (user: Employee) => void;
  onSort: (field: keyof Employee) => void; // Sorting handler
};

type confirmationModalProps = {
  header: string;
  bodyText: string;
  openModal: boolean;
  closeModal: () => void;
  onYesClick: () => void;
};

export type { Employee, formProps, tableProps, confirmationModalProps };
