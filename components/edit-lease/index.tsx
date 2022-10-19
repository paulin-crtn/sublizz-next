/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers";
import "react-datepicker/dist/react-datepicker.css";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "../../context/auth.context";
import { useAlert } from "../../context/alert.context";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { LeaseTypeEnum } from "../../enum/LeaseTypeEnum";
import { storeLease } from "../../utils/fetchLease";
import { convertLeaseType } from "../../utils/convertLeaseType";
import { TextField } from "@mui/material";
import styles from "./edit-lease.module.css";

export interface IEditLease {
  type: string;
  startDate: string;
  endDate: string;
  houseNumber: string;
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLease = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { setUser } = useAuth();
  const { success } = useAlert();

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
          defaultValue="" // Avoid error "A component is changing the uncontrolled value state to be controlled."
          render={({ field: { onChange, ...field } }) => (
            <Select
              variant="soft"
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
        <FormLabel>Date de début</FormLabel>
        <Controller
          name="startDate"
          control={control}
          rules={{ required: "Ce champs est requis" }}
          defaultValue=""
          render={({ field: { onChange, ...field } }) => (
            <MobileDatePicker
              onChange={(event) => {
                onChange(event);
              }}
              renderInput={(params) => (
                <TextField {...params} error={!!errors.startDate} />
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

      <FormControl error={!!errors.houseNumber}>
        <FormLabel>Numéro de rue</FormLabel>
        <Input
          type="text"
          variant="soft"
          {...register("houseNumber", {
            required: "Ce champs est requis",
          })}
        />
        {errors.houseNumber && (
          <FormHelperText>{errors.houseNumber.message}</FormHelperText>
        )}
      </FormControl>

      {!isLoading && (
        <Button fullWidth type="submit">
          Se connecter
        </Button>
      )}
      {isLoading && (
        <Button
          fullWidth
          disabled
          startDecorator={<CircularProgress color="danger" thickness={3} />}
        />
      )}
    </form>
  );
};

export default EditLease;
