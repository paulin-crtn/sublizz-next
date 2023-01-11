/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Box from "@mui/joy/Box";
import Skeleton from "@mui/material/Skeleton";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseSkeleton = () => {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        height={180}
        sx={{ backgroundColor: "#32313c", borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangular"
        height={20}
        sx={{ backgroundColor: "#32313c", borderRadius: 2, marginTop: 4 }}
      />
      <Skeleton
        variant="rectangular"
        height={20}
        sx={{ backgroundColor: "#32313c", borderRadius: 2, marginTop: 2 }}
      />
      <Skeleton
        variant="rectangular"
        height={20}
        width="60%"
        sx={{ backgroundColor: "#32313c", borderRadius: 2, marginTop: 2 }}
      />
      <Skeleton
        variant="rectangular"
        height={20}
        width="80%"
        sx={{ backgroundColor: "#32313c", borderRadius: 2, marginTop: 5 }}
      />
    </Box>
  );
};

export default LeaseSkeleton;
