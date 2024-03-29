import Chip from "@mui/joy/Chip";

const Optional = ({ margin = "0 0 0 8px" }) => {
  return (
    <Chip
      size="sm"
      sx={{
        margin,
        fontWeight: 400,
        backgroundColor: "#474747",
      }}
    >
      Optionnel
    </Chip>
  );
};

export default Optional;
