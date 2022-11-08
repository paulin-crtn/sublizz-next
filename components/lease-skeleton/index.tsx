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
    <Box display="flex" flexDirection="row" padding={1.5}>
      <Box width="100%" flex="0 0 200px">
        <Skeleton
          variant="rectangular"
          height={140}
          sx={{ backgroundColor: "#cccccc", borderRadius: 2 }}
        />
      </Box>
      <Box width="100%" flex="1 1" marginLeft={3}>
        <Skeleton
          variant="rectangular"
          height={20}
          width="320px"
          sx={{ backgroundColor: "#cccccc", borderRadius: 2 }}
        />
        <Skeleton
          variant="rectangular"
          height={20}
          width="320px"
          sx={{ backgroundColor: "#cccccc", borderRadius: 2, marginTop: 1 }}
        />
        <Skeleton
          variant="rectangular"
          height={20}
          width="220px"
          sx={{ backgroundColor: "#cccccc", borderRadius: 2, marginTop: 1 }}
        />
        <Skeleton
          variant="rectangular"
          height={20}
          width="140px"
          sx={{ backgroundColor: "#cccccc", borderRadius: 2, marginTop: 4 }}
        />
      </Box>
    </Box>
  );
};

export default LeaseSkeleton;
