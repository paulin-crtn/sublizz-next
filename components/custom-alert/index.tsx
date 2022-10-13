/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Typography from "@mui/joy/Typography";
import Alert from "@mui/joy/Alert";
import { useAlert } from "../../context/alert.context";
import { AlertStatusEnum } from "../../enum/AlertStatusEnum";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomAlert = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { alertStatus, alertText } = useAlert();

  /* -------------------------------- FUNCTION -------------------------------- */
  const getStartDecorator = (status: AlertStatusEnum) => {
    switch (status) {
      case AlertStatusEnum.SUCCESS:
        return <CheckCircleIcon sx={{ mr: 0.5 }} />;

      case AlertStatusEnum.DANGER:
        return <ErrorIcon sx={{ mr: 0.5 }} />;

      default:
        break;
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (alertStatus !== AlertStatusEnum.NONE) {
    return (
      <Alert
        variant="soft"
        color={alertStatus}
        sx={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translate(-50%, 0)",
          zIndex: 1000,
          width: "fit-content",
          paddingX: 3,
        }}
      >
        <Typography startDecorator={getStartDecorator(alertStatus)}>
          {alertText}
        </Typography>
      </Alert>
    );
  } else {
    return null;
  }
};

export default CustomAlert;
