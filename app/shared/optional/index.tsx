import Chip from "@mui/joy/Chip";

const Optional = ({ margin = "0 0 0 8px" }) => {
  return (
    <Chip
      size="sm"
      color="info"
      variant="soft"
      sx={{
        margin,
        fontWeight: 400,
      }}
    >
      Optionnel
    </Chip>
  );
};

export default Optional;
