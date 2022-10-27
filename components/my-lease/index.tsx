/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import format from "date-fns/format";
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import LeaseChips from "../lease-chips";
import noLeaseImg from "../../public/img/no-lease-img.png";
import { ILeaseDetail } from "../../interfaces/lease";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListDivider from "@mui/joy/ListDivider";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateLease } from "../../utils/fetch/fetchLease";
import toast from "react-hot-toast";
import { TOAST_STYLE } from "../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const MyLease: FunctionComponent<{ lease: ILeaseDetail }> = ({ lease }) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [anchorEl, setAnchorEl] = useState(null);

  /* ------------------------------ USE MUTATION ------------------------------ */
  const queryClient = useQueryClient();

  const { mutate: mutatePublishedStatus } = useMutation(
    () =>
      updateLease(lease.id, {
        ...lease,
        isPublished: lease.isPublished === 0 ? "1" : "0",
      }),
    {
      onSuccess: async (data: ILeaseDetail) => {
        // Update React Query Cache
        queryClient.setQueryData(
          ["userLeases"],
          (previousLeases: ILeaseDetail[] | undefined) =>
            previousLeases?.map((previousLease) =>
              previousLease.id === lease.id ? data : previousLease
            )
        );
        // Toast
        toast.success(
          data.isPublished ? "Annonce activée" : "Annonce désactivée",
          { style: TOAST_STYLE }
        );
      },
      onError: async (error) => {
        error instanceof Error
          ? toast.error(error.message, { style: TOAST_STYLE })
          : toast.error("An error occured", {
              style: TOAST_STYLE,
            });
      },
    }
  );

  /* -------------------------------- FUNCTIONS ------------------------------- */
  // MenuList
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box sx={{ display: "flex", padding: 1.5 }}>
      <CardOverflow sx={{ borderRadius: 10, overflow: "hidden" }}>
        <AspectRatio ratio="16/12.1" sx={{ width: 200 }}>
          <Image
            src={lease.leaseImages[0]?.url ?? noLeaseImg}
            layout="fill"
            priority={true}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ pl: 3 }}>
        <Sheet
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="h5" fontWeight="600">
            {lease.city}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              size="sm"
              sx={{
                marginRight: 1,
                paddingY: 0.7,
                fontWeight: 300,
                backgroundColor: lease.isPublished ? "darkseagreen" : "tan",
                border: "none",
                borderRadius: "5px",
              }}
            >
              {lease.isPublished ? "En ligne" : "Désactivée"}
            </Chip>
            <IconButton
              id="positioned-demo-button"
              aria-controls={open ? "positioned-demo-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="outlined"
              color="neutral"
              size="sm"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="positioned-demo-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              aria-labelledby="positioned-demo-button"
              placement="bottom-end"
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  mutatePublishedStatus();
                }}
              >
                <Typography
                  startDecorator={
                    lease.isPublished ? <PauseIcon /> : <PlayArrowIcon />
                  }
                >
                  {lease.isPublished ? "Désactiver" : "Activer"}
                </Typography>
              </MenuItem>
              <Link href={`/dashboard/leases/${lease.id}`}>
                <MenuItem onClick={handleClose}>
                  <Typography startDecorator={<EditIcon />}>
                    Modifier
                  </Typography>
                </MenuItem>
              </Link>
              <ListDivider />
              <MenuItem onClick={handleClose}>
                <Typography color="danger" startDecorator={<DeleteIcon />}>
                  Supprimer
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Sheet>

        <Sheet sx={{ display: "flex", alignItems: "center", mt: 0.5, mb: 2 }}>
          <Box>
            {!lease.endDate && (
              <Typography level="body1" fontWeight={300}>
                À partir du {format(new Date(lease.startDate), "dd MMM uuuu")}
              </Typography>
            )}
            {lease.endDate && (
              <Typography level="body1" fontWeight={300}>
                Du {format(new Date(lease.startDate), "dd MMM uuuu")} au{" "}
                {format(new Date(lease.endDate), "dd MMM uuuu")}
              </Typography>
            )}
          </Box>
          {!!lease.isDateFlexible && (
            <Chip variant="soft" color="neutral" size="sm" sx={{ ml: 1 }}>
              Dates flexibles
            </Chip>
          )}
        </Sheet>

        <LeaseChips lease={lease} size="sm" />

        <Typography level="h6" fontWeight="300" marginTop={2}>
          {lease.pricePerMonth}€ CC
        </Typography>
      </CardContent>
    </Box>
  );
};

export default MyLease;
