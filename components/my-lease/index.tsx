/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
/* ---------------------------------- UTILS --------------------------------- */
import { deleteLease, updateLease } from "../../utils/fetch/fetchLease";
import { destroyLeaseImages } from "../../utils/fetch/fetchLeaseImages";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseChips from "../lease-chips";
import LeaseDates from "../lease-dates";
/* ----------------------------------- MUI ---------------------------------- */
import CardOverflow from "@mui/joy/CardOverflow";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
/* ---------------------------------- ICONS --------------------------------- */
import MoreVert from "@mui/icons-material/MoreVert";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILeaseDetail } from "../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import noLeaseImg from "../../public/img/no-lease-img.png";
import { LEASE_IMAGE_PATH } from "../../const/supabasePath";
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
    () => {
      const isPublished = lease.isPublished === 0 ? "1" : "0";
      return updateLease(lease.id, {
        ...lease,
        isPublished,
      });
    },
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
          : toast.error("Une erreur est survenue", {
              style: TOAST_STYLE,
            });
      },
    }
  );

  const { mutate: mutateDeleteLease } = useMutation(
    () => deleteLease(lease.id),
    {
      onSuccess: async () => {
        // Update React Query Cache
        queryClient.setQueryData(
          ["userLeases"],
          (previousLeases: ILeaseDetail[] | undefined) =>
            previousLeases?.filter(
              (previousLease) => previousLease.id !== lease.id
            )
        );
        // Toast
        toast.success("Annonce supprimée", { style: TOAST_STYLE });
        // Delete leaseImages from storage
        if (lease.leaseImages) {
          await destroyLeaseImages(lease.leaseImages);
        }
      },
      onError: async (error) => {
        error instanceof Error
          ? toast.error(error.message, { style: TOAST_STYLE })
          : toast.error("Une erreur est survenue", {
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
            src={
              lease.leaseImages && lease.leaseImages[0]
                ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
                : noLeaseImg
            }
            layout="fill"
            priority={true}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ pl: 3 }}>
        <Box
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
              color={lease.isPublished ? "primary" : "warning"}
              sx={{
                marginRight: 1,
                paddingY: 0.7,
                fontWeight: 300,
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
              {!!lease.isPublished && (
                <Link href={`/leases/${lease.id}`}>
                  <MenuItem onClick={handleClose}>
                    <Typography startDecorator={<FilterVintageIcon />}>
                      Voir
                    </Typography>
                  </MenuItem>
                </Link>
              )}
              <Link href={`/dashboard/leases/${lease.id}`}>
                <MenuItem onClick={handleClose}>
                  <Typography startDecorator={<DriveFileRenameOutlineIcon />}>
                    Modifier
                  </Typography>
                </MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  handleClose();
                  mutatePublishedStatus();
                }}
              >
                <Typography startDecorator={<PowerSettingsNewIcon />}>
                  {lease.isPublished ? "Désactiver" : "Activer"}
                </Typography>
              </MenuItem>
              <ListDivider />
              <MenuItem
                color="danger"
                onClick={async () => {
                  handleClose();
                  mutateDeleteLease();
                }}
              >
                <Typography color="danger" startDecorator={<DeleteIcon />}>
                  Supprimer
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <LeaseDates lease={lease} />
        <LeaseChips lease={lease} size="sm" />
        <Typography level="h6" fontWeight="300" marginTop={2}>
          {lease.pricePerMonth}€ CC
        </Typography>
      </CardContent>
    </Box>
  );
};

export default MyLease;
