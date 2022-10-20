/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller, useWatch } from "react-hook-form";
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
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import { LeaseTypeEnum } from "../../enum/LeaseTypeEnum";
import { storeLease } from "../../utils/fetchLease";
import { convertLeaseType } from "../../utils/convertLeaseType";
import { TextField } from "@mui/material";
import ModalLayout from "../modal-layout";
import AddressForm from "../address-form";

export interface IEditLease {
  type: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isDateFlexible: boolean;
  street: string;
  postCode: string;
  city: string;
  gpsLatitude: string;
  gpsLongitude: string;
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLease = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [openAddress, setOpenAddress] = useState<boolean>(false);
  const [dataGouvAddress, setDataGouvAddress] = useState<any>();

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    setError("street", { type: "required", message: "Ce champs est requis" });
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
      onSuccess: async (data) => {},
    }
  );

  /* -------------------------------- USE FORM -------------------------------- */
  const {
    handleSubmit,
    formState,
    control,
    setValue,
    getValues,
    trigger,
    setError,
    clearErrors,
  } = useForm<IEditLease>({
    mode: "onTouched",
  });
  const { errors } = formState;

  const startDate = useWatch({ name: "startDate", control });
  const endDate = useWatch({ name: "endDate", control });

  /* -------------------------------- FUNCTION -------------------------------- */
  const onSubmit: SubmitHandler<IEditLease> = async (payload) => {
    console.log(payload);
    // mutate(payload);
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
              onChange={(event) => {
                setValue(
                  "type",
                  (event?.target as HTMLInputElement).ariaLabel as string
                );
                trigger("type"); // Revalidate input
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
              maxDate={endDate}
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
              minDate={startDate}
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
          defaultValue={false}
          render={({ field: { onChange, ...field } }) => (
            <Switch
              variant="soft"
              color="neutral"
              onChange={(event) => {
                onChange(event);
              }}
              {...field}
              sx={{ marginBottom: "auto", ml: 2 }}
            ></Switch>
          )}
        />
      </FormControl>

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
          <Button
            variant="soft"
            color={errors.street ? "danger" : "neutral"}
            onClick={() => setOpenAddress(true)}
          >
            Remplir l'adresse
          </Button>
        )}
        {errors.street && (
          <FormHelperText>{errors.street.message}</FormHelperText>
        )}
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
