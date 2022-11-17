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
import ModalLayout from "../modal-layout";
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
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
/* ---------------------------------- ICONS --------------------------------- */
import MoreVert from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
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
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

  /* ------------------------------ USE MUTATION ------------------------------ */
  const queryClient = useQueryClient();

  const { mutate: mutatePublishedStatus, isLoading } = useMutation(
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
        if (lease.leaseImages && !!lease.leaseImages.length) {
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
              id="lease-options-button"
              aria-controls={open ? "lease-options-menu" : undefined}
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
                    {/* <ListItemDecorator>
                      <FilterVintageIcon />
                    </ListItemDecorator> */}
                    Voir l'annonce
                  </MenuItem>
                </Link>
              )}
              <Link href={`/dashboard/leases/${lease.id}`}>
                <MenuItem onClick={handleClose}>
                  {/* <ListItemDecorator>
                    <DriveFileRenameOutlineIcon />
                  </ListItemDecorator> */}
                  Modifier
                </MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  handleClose();
                  mutatePublishedStatus();
                }}
              >
                {/* <ListItemDecorator>
                  {lease.isPublished ? (
                    <StopCircleIcon />
                  ) : (
                    <PlayCircleFilledWhiteIcon />
                  )}
                </ListItemDecorator> */}
                {lease.isPublished ? "Désactiver" : "Activer"}
              </MenuItem>
              <ListDivider />
              <MenuItem
                onClick={async () => {
                  handleClose();
                  setOpenConfirmDelete(true);
                }}
              >
                {/* <ListItemDecorator sx={{ color: "inherit" }}>
                  <DeleteIcon />
                </ListItemDecorator> */}
                Supprimer
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

      {/** Confirm Lease Delete */}
      <Modal
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <ModalDialog size="lg" aria-labelledby="confirm-delete-modal">
          <ModalClose />
          <ModalLayout title="Confirmer la suppression">
            <Typography mb={3} textAlign="center" fontWeight={300}>
              L'annonce suivante sera définitivement supprimée.
            </Typography>
            <Box
              sx={{
                marginBottom: 3,
                padding: 2,
                border: "1px solid #dddee0",
                borderRadius: "12px",
              }}
            >
              <Typography level="h5" fontWeight="600">
                {lease.city}
              </Typography>
              <LeaseDates lease={lease} />
              <LeaseChips lease={lease} size="sm" />
              <Typography level="h6" fontWeight="300" marginTop={2}>
                {lease.pricePerMonth}€ CC
              </Typography>
            </Box>
            {!isLoading && (
              <Button
                variant="soft"
                color="danger"
                fullWidth
                onClick={() => mutateDeleteLease()}
              >
                Supprimer l'annonce
              </Button>
            )}
            {isLoading && (
              <Button variant="soft" color="danger" fullWidth disabled>
                <CircularProgress color="danger" thickness={3} />
              </Button>
            )}
            <Button
              variant="soft"
              color="neutral"
              fullWidth
              onClick={() => setOpenConfirmDelete(false)}
              sx={{ mt: 1 }}
            >
              Annuler
            </Button>
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default MyLease;
