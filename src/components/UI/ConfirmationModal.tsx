import {
  Modal,
  Box,
  Typography,
  Grid2 as Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button";
import { confirmationModalProps } from "../../utils/types";

const ConfirmationModal: React.FC<confirmationModalProps> = ({
  openModal,
  closeModal,
  header,
  onYesClick,
  bodyText,
}) => {
  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          margin: "auto",
          maxWidth: 500,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2%",
        }}
      >
        {/* Modal Header */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginBottom: 2,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {header}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: -16,
              top: -16,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Body */}
        <Typography sx={{ marginTop: 2, marginBottom: 4, textAlign: "center" }}>
          {bodyText}
        </Typography>

        {/* Modal Actions */}
        <Grid container spacing={2} justifyContent="center">
          <Grid>
            <Button text="No" color="primary" handleClick={closeModal} />
          </Grid>
          <Grid>
            <Button text="Yes" color="error" handleClick={onYesClick} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
