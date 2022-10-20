/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "../../context/auth.context";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { LeaseTypeEnum } from "../../enum/LeaseTypeEnum";
import { storeLease } from "../../utils/fetchLease";
import { convertLeaseType } from "../../utils/convertLeaseType";
import { TextField } from "@mui/material";
import Chip from "@mui/joy/Chip";
import styles from "./edit-lease.module.css";
import Box from "@mui/joy/Box";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";

export interface IEditLease {
  type: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isDateFlexible: boolean;
  street: string;
  postCode: string;
  city: string;
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLease = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setUser } = useAuth();

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error } = useMutation(
    (payload: IEditLease) => storeLease(payload),
    {
      onSuccess: async (data) => {},
    }
  );

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState, control, setValue, trigger } =
    useForm<IEditLease>({
      mode: "onTouched",
    });
  const { errors } = formState;

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
        <Input
          type="text"
          variant="soft"
          placeholder="10 rue Succursale"
          {...register("street", {
            required: "Ce champs est requis",
            maxLength: {
              value: 30,
              message: "30 caractères maximum",
            },
          })}
        />
        {errors.street && (
          <FormHelperText>{errors.street.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.postCode}>
        <FormLabel>Code postale</FormLabel>
        <Input
          type="text"
          variant="soft"
          placeholder="33000"
          {...register("postCode", {
            valueAsNumber: true,
            required: "Ce champs est requis",
            minLength: {
              value: 5,
              message: "5 chiffres sont attendus",
            },
            maxLength: {
              value: 5,
              message: "5 chiffres sont attendus",
            },
          })}
        />
        {errors.postCode && (
          <FormHelperText>{errors.postCode.message}</FormHelperText>
        )}
      </FormControl>

      <FormControl error={!!errors.city}>
        <FormLabel>Ville</FormLabel>
        <Input
          type="text"
          variant="soft"
          placeholder="Bordeaux"
          {...register("city", {
            required: "Ce champs est requis",
            maxLength: {
              value: 30,
              message: "30 caractères maximum",
            },
          })}
        />
        {errors.city && <FormHelperText>{errors.city.message}</FormHelperText>}
      </FormControl>

      {!isLoading && <Button type="submit">Enregistrer</Button>}
      {isLoading && (
        <Button disabled>
          <CircularProgress color="danger" thickness={3} />
        </Button>
      )}
    </form>
  );
};

export default EditLease;
