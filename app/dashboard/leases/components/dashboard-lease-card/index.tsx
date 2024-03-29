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
import { updateLease } from "../../../../../utils/fetch/fetchLease";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseChips from "../../../../shared/lease-chips";
import LeaseDates from "../../../../shared/lease-dates";
import ModalLayout from "../../../../shared/modal-layout";
import DeleteLease from "../delete-lease";
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
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
/* ---------------------------------- ICONS --------------------------------- */
import MoreVert from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MonitorIcon from "@mui/icons-material/Monitor";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILeaseDetail } from "../../../../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import noLeaseImg from "../../../../../public/img/no-lease-img.png";
import { LEASE_IMAGE_PATH } from "../../../../../const/objectStoragePath";
import { TOAST_STYLE } from "../../../../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const DashboardLeaseCard: FunctionComponent<{ lease: ILeaseDetail }> = ({
  lease,
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

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
      <CardOverflow sx={{ borderRadius: 2, overflow: "hidden" }}>
        <AspectRatio ratio="16/10" sx={{ width: 250 }}>
          <Image
            src={
              lease.leaseImages && lease.leaseImages[0]
                ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
                : noLeaseImg
            }
            alt="lease image"
            fill={true}
            style={{ objectFit: "cover" }}
            priority={true}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ pl: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography level="h5" fontWeight="600">
              {lease.city}
            </Typography>
            <Box marginY={2}>
              <LeaseChips lease={lease} size="sm" />
            </Box>
            <LeaseDates lease={lease} fullDate={true} showFlexible={true} />
            <Typography level="h6" fontWeight="300" marginTop={2}>
              {lease.pricePerMonth}€ CC
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              size="sm"
              sx={{
                marginRight: 1,
                paddingY: 0.7,
                fontWeight: 300,
                backgroundColor: lease.isPublished ? "#4fa368" : "#dca81a",
                color: lease.isPublished ? "#ffffff" : "#000000",
                border: "none",
                borderRadius: "5px",
              }}
            >
              {lease.isPublished ? "En ligne" : "Désactivée"}
            </Chip>
            <IconButton
              id="lease-options-button"
              aria-controls={open ? "lease-options-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="plain"
              color="neutral"
              size="sm"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="lease-options-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              size="sm"
              aria-labelledby="lease-options-button"
              placement="bottom-end"
            >
              {!!lease.isPublished && (
                <Link href={`/leases/${lease.id}`}>
                  <MenuItem onClick={handleClose}>
                    <ListItemDecorator>
                      <MonitorIcon />
                    </ListItemDecorator>
                    Voir
                  </MenuItem>
                </Link>
              )}
              <Link href={`/dashboard/leases/${lease.id}`}>
                <MenuItem onClick={handleClose}>
                  <ListItemDecorator>
                    <EditIcon />
                  </ListItemDecorator>
                  Modifier
                </MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  handleClose();
                  mutatePublishedStatus();
                }}
              >
                <ListItemDecorator>
                  {lease.isPublished ? <PauseIcon /> : <PlayArrowIcon />}
                </ListItemDecorator>
                {lease.isPublished ? "Désactiver" : "Activer"}
              </MenuItem>
              <ListDivider />
              <MenuItem
                onClick={async () => {
                  handleClose();
                  setOpenConfirmDelete(true);
                }}
              >
                <ListItemDecorator sx={{ color: "inherit" }}>
                  <DeleteIcon />
                </ListItemDecorator>
                Supprimer
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </CardContent>

      {/** Confirm Lease Delete */}
      <Modal
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <ModalDialog size="lg" aria-labelledby="confirm-delete-modal">
          <ModalClose />
          <ModalLayout title="Confirmer la suppression">
            <DeleteLease
              lease={lease}
              setOpenConfirmDelete={setOpenConfirmDelete}
            />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default DashboardLeaseCard;
