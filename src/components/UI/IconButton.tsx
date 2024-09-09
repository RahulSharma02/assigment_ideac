import { Tooltip, IconButton } from "@mui/material";
import React from "react";

interface TooltipIconButtonProps {
  icon: React.ReactNode;
  tooltipTitle: string;
  onClick: () => void;
}

const TooltipIconButton: React.FC<TooltipIconButtonProps> = ({
  icon,
  tooltipTitle,
  onClick,
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
};

export default TooltipIconButton;
