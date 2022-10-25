/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { MobileDatePicker } from "@mui/x-date-pickers";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Box from "@mui/joy/Box";
import Switch from "@mui/joy/Switch";
import Chip from "@mui/joy/Chip";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Input from "@mui/joy/Input";
import { TextField } from "@mui/material";
import { LeaseTypeEnum } from "../../enum/LeaseTypeEnum";
import { storeLease } from "../../utils/fetch/fetchLease";
import { convertLeaseType } from "../../utils/convertLeaseType";
import ModalLayout from "../modal-layout";
import AddressForm from "../address-form";
import { TOAST_STYLE } from "../../const/toastStyle";

export interface IEditLease {
  type: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isDateFlexible: number;
  street: string;
  postCode: string;
  city: string;
  gpsLatitude: string;
  gpsLongitude: string;
  room: number;
  surface: number;
  pricePerMonth: number;
  description: string;
  isPublished: string; // Input radio doesn't work with 0 and false values
  leaseImageNames: string[];
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLease = () => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [openAddress, setOpenAddress] = useState<boolean>(false);
  const [dataGouvAddress, setDataGouvAddress] = useState<any>();

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    if (dataGouvAddress) {
      setValue("street", dataGouvAddress.properties.name);
      setValue("postCode", dataGouvAddress.properties.postcode);
      setValue("city", dataGouvAddress.properties.city);
      setValue("gpsLongitude", dataGouvAddress.geometry.coordinates[0]);
      setValue("gpsLatitude", dataGouvAddress.geometry.coordinates[1]);
      clearErrors("street");
      setOpenAddress(false);
    }
  }, [dataGouvAddress]);

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error } = useMutation(
    (payload: IEditLease) => storeLease(payload),
    {
      onSuccess: async (data) => {
        toast.success("Annonce enregistrée", { style: TOAST_STYLE });
        router.push("/user/leases");
      },
    }
  );

  /* -------------------------------- USE FORM -------------------------------- */
  const {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    getValues,
    trigger,
    clearErrors,
    watch,
  } = useForm<IEditLease>({
    mode: "onTouched",
  });
  const { errors } = formState;

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<IEditLease> = async (payload) => {
    console.log(payload);
    mutate(payload);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && error instanceof Error && (
        <Alert
          startDecorator={<ErrorIcon />}
          variant="soft"
          color="danger"
          sx={{ mb: 2 }}
        >
          {error.message}
        </Alert>
      )}

      <FormControl error={!!errors.type}>
        <FormLabel>Type</FormLabel>
        <Controller
          name="type"
          control={control}
          rules={{ required: "Ce champs est requis" }}
          defaultValue={null} // Avoid error "A component is changing the uncontrolled value state to be controlled."
          render={({ field: { onChange, ...field } }) => (
            <Select
              variant="soft"
              placeholder="Sous-location"
              onChange={async (event) => {
                setValue(
                  "type",
                  (event?.target as HTMLInputElement).ariaLabel as string
                );
                await trigger("type"); // Revalidate input
              }}
              {...field}
            >
              {Object.values(LeaseTypeEnum).map((type) => (
                <Option key={type} value={type} aria-label={type}>
                  {convertLeaseType(type)}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
      </FormControl>

      <FormControl error={!!errors.startDate}>
        <FormLabel>Disponible à partir du</FormLabel>
        <Controller
          name="startDate"
          control={control}
          rules={{ required: "Ce champs est requis" }}
          defaultValue={null} // Avoid having the current date by default
          render={({ field: { onChange, ...field } }) => (
            <MobileDatePicker
              onChange={(event) => {
                onChange(event);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.startDate}
                  placeholder="jj/mm/aaaa"
                />
              )}
              {...field}
              closeOnSelect
              disablePast
              maxDate={watch("endDate")}
              inputFormat="dd/MM/yyyy"
            />
          )}
        />
        {errors.startDate && (
          <FormHelperText>{errors.startDate.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.endDate}>
        <FormLabel>Jusqu'au</FormLabel>
        <Controller
          name="endDate"
          control={control}
          rules={{ required: "Ce champs est requis" }}
          defaultValue={null} // Avoid having the current date by default
          render={({ field: { onChange, ...field } }) => (
            <MobileDatePicker
              onChange={(event) => {
                onChange(event);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.endDate}
                  placeholder="jj/mm/aaaa"
                />
              )}
              {...field}
              closeOnSelect
              disablePast
              minDate={watch("startDate")}
              inputFormat="dd/MM/yyyy"
            />
          )}
        />
        {errors.endDate && (
          <FormHelperText>{errors.endDate.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl orientation="horizontal">
        <Box>
          <Typography fontWeight={500}>Dates flexibles</Typography>
        </Box>
        <Controller
          name="isDateFlexible"
          control={control}
          defaultValue={0}
          render={() => (
            <Switch
              variant="soft"
              color="neutral"
              sx={{ marginBottom: "auto", ml: 2 }}
            />
          )}
        />
      </FormControl>

      {/**
       * Here the "street" key is only used for display, validation and error purpose.
       * Address (street, postCode and city) are handled in AdressForm component
       * and updated via react-hook-form's setValue method in a useEffect hook above.
       */}
      <FormControl error={!!errors.street}>
        <FormLabel>Adresse</FormLabel>
        {getValues("street") ? (
          <Alert
            variant="soft"
            color="neutral"
            sx={{ marginBottom: 1, paddingY: 0.5 }}
          >
            <Typography>
              {getValues("street")}, {getValues("postCode")} {getValues("city")}
            </Typography>
            <Button
              size="sm"
              variant="plain"
              color="neutral"
              sx={{ marginLeft: "auto" }}
              onClick={() => setOpenAddress(true)}
            >
              Modifier
            </Button>
          </Alert>
        ) : (
          <>
            <Controller
              name="street"
              control={control}
              rules={{ required: "Ce champs est requis" }}
              render={() => (
                <Button
                  variant="soft"
                  color={errors.street ? "danger" : "neutral"}
                  onClick={() => setOpenAddress(true)}
                >
                  Remplir l'adresse
                </Button>
              )}
            />
            {errors.street && (
              <FormHelperText>{errors.street.message}</FormHelperText>
            )}
          </>
        )}
      </FormControl>

      <FormControl error={!!errors.room}>
        <FormLabel>Nombre de pièces</FormLabel>
        <Input
          type="number"
          variant="soft"
          placeholder="2"
          {...register("room", {
            valueAsNumber: true,
            required: "Ce champs est requis",
            min: {
              value: 1,
              message: "1 pièce minimum",
            },
            max: {
              value: 10,
              message: "10 pièces maximum",
            },
          })}
        />
        {errors.room && <FormHelperText>{errors.room.message}</FormHelperText>}
      </FormControl>

      <FormControl error={!!errors.surface}>
        <FormLabel>Surface</FormLabel>
        <Input
          type="number"
          variant="soft"
          placeholder="45"
          {...register("surface", {
            valueAsNumber: true,
            required: "Ce champs est requis",
            min: {
              value: 10,
              message: "10 m2 minimum",
            },
            max: {
              value: 200,
              message: "200 m2 maximum",
            },
          })}
        />
        {errors.surface && (
          <FormHelperText>{errors.surface.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.pricePerMonth}>
        <FormLabel>Prix par mois</FormLabel>
        <Input
          type="number"
          variant="soft"
          placeholder="1200"
          {...register("pricePerMonth", {
            valueAsNumber: true,
            required: "Ce champs est requis",
            min: {
              value: 200,
              message: "200€ minimum",
            },
            max: {
              value: 2000,
              message: "2000€ maximum",
            },
          })}
        />
        {errors.pricePerMonth && (
          <FormHelperText>{errors.pricePerMonth.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl>
        <FormLabel>
          Description
          <Chip
            size="sm"
            color="info"
            variant="soft"
            sx={{ marginLeft: 1, fontWeight: 400 }}
          >
            Optionnel
          </Chip>
        </FormLabel>
        <Textarea
          variant="soft"
          {...register("description")}
          minRows={5}
          maxRows={5}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Publier</FormLabel>
        <RadioGroup aria-labelledby="is-published-label" defaultValue="1">
          <Sheet>
            <Radio
              label="Maintenant"
              value="1"
              disableIcon
              {...register("isPublished")}
            />
            <Radio
              label="Plus tard"
              value="0"
              disableIcon
              {...register("isPublished")}
              sx={{ marginLeft: 1 }}
            />
          </Sheet>
        </RadioGroup>
      </FormControl>

      {!isLoading && <Button type="submit">Enregistrer</Button>}
      {isLoading && (
        <Button disabled>
          <CircularProgress color="danger" thickness={3} />
        </Button>
      )}

      {/** Address */}
      <Modal open={openAddress} onClose={() => setOpenAddress(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-address">
          <ModalClose />
          <ModalLayout title="Adresse du logement">
            <AddressForm
              setDataGouvAddress={setDataGouvAddress}
              postCode={getValues("postCode")}
              street={getValues("street")}
            />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </form>
  );
};

export default EditLease;
