import { Button, ButtonProps as MUIButtonProps } from "@mui/material";

type CustomButtonProps = {
  handleClick: () => void;
  text: string;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "success";
} & MUIButtonProps;

const CommonButton: React.FC<CustomButtonProps> = ({
  handleClick,
  variant = "contained",
  color = "primary",
  text,
  ...props
}) => {
  return (
    <Button
      color={color}
      variant={variant}
      onClick={handleClick}
      {...props}
      size="medium"
    >
      {text}
    </Button>
  );
};

export default CommonButton;
