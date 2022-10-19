/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "../../context/auth.context";
import { useAlert } from "../../context/alert.context";
import { customFetch } from "../../utils/customFetch";
import { signin } from "../../utils/fetchAuth";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { LeaseTypeEnum } from "../../enum/LeaseTypeEnum";
import { storeLease } from "../../utils/fetchLease";
import { convertLeaseType } from "../../utils/convertLeaseType";

export interface IEditLease {
  type: string;
  startDate: any;
  endDate: any;
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
  const { register, handleSubmit, formState, control, setValue } =
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
          rules={{ required: true }}
          defaultValue="" // Avoid error "A component is changing the uncontrolled value state to be controlled."
          render={({ field: { onChange, ...field } }) => (
            <Select
              variant="soft"
              onChange={(event) => {
                setValue(
                  "type",
                  (event?.target as HTMLInputElement).ariaLabel as string
                );
              }}
              {...field}
            >
              {Object.values(LeaseTypeEnum).map((type) => (
                <Option
                  key={type}
                  value={type}
                  color="neutral"
                  aria-label={type}
                >
                  {convertLeaseType(type)}
                </Option>
              ))}
            </Select>
          )}
        />
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
