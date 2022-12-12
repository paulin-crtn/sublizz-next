/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
/* ---------------------------------- UTILS --------------------------------- */
import { getDataGouvAddress } from "../../../../../../utils/fetch/fetchAddress";
/* ----------------------------------- MUI ---------------------------------- */
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import ErrorIcon from "@mui/icons-material/Error";

/* -------------------------------------------------------------------------- */
/*                                 INTERFACES                                 */
/* -------------------------------------------------------------------------- */
interface IAddressForm {
  postCode: string;
  street: string;
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AddressForm = ({
  setDataGouvAddress,
  postCode,
  street,
}: {
  setDataGouvAddress: Dispatch<SetStateAction<any>>;
  postCode: string | undefined;
  street: string | undefined;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [dataGouvAddresses, setDataGouvAddresses] = useState<any[]>([]);
  const [isAddressFound, setIsAddressFound] = useState<boolean>(true);

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error } = useMutation(
    (payload: IAddressForm) =>
      getDataGouvAddress(payload.postCode, payload.street),
    {
      onSuccess: async (data) => {
        if (data.features.length === 0) {
          setIsAddressFound(false);
        } else if (data.features.length === 1) {
          setDataGouvAddress(data.features[0]);
        } else {
          setDataGouvAddresses(data.features);
        }
      },
    }
  );

  /* -------------------------------- USE FORM -------------------------------- */
  const { register, handleSubmit, formState } = useForm<IAddressForm>({
    mode: "onTouched",
  });
  const { errors } = formState;

  /* -------------------------------- FUNCTION -------------------------------- */
  const stopPropagate = (callback: () => void) => {
    return (e: { stopPropagation: () => void; preventDefault: () => void }) => {
      e.stopPropagation();
      e.preventDefault();
      callback();
    };
  };

  const onSubmit: SubmitHandler<IAddressForm> = async (payload) => {
    setIsAddressFound(true);
    mutate(payload);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!!dataGouvAddresses?.length) {
    return (
      <>
        <FormLabel sx={{ marginBottom: 2 }}>Sélectionnez une adresse</FormLabel>
        {dataGouvAddresses.map((address) => (
          <Alert
            key={address.properties.id}
            variant="solid"
            color="warning"
            sx={(theme) => ({
              marginTop: 1,
              cursor: "pointer",
              ":hover": {
                backgroundColor: theme.palette.warning.solidHoverBg,
              },
            })}
            onClick={() => setDataGouvAddress(address)}
          >
            <Typography>
              {address.properties.name}, {address.properties.postcode}{" "}
              {address.properties.city}
            </Typography>
          </Alert>
        ))}
        <Button
          variant="soft"
          color="neutral"
          fullWidth
          type="button"
          onClick={() => setDataGouvAddresses([])}
          sx={{ marginTop: 2 }}
        >
          Modifier l'adresse
        </Button>
      </>
    );
  }
  return (
    <form onSubmit={stopPropagate(handleSubmit(onSubmit))}>
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

      {!isAddressFound && (
        <Alert
          startDecorator={<ErrorIcon />}
          variant="soft"
          color="danger"
          sx={{ mb: 2 }}
        >
          Adresse non trouvée
        </Alert>
      )}

      <FormControl error={!!errors.street}>
        <FormLabel>Nom de rue</FormLabel>
        <FormHelperText
          sx={{
            marginTop: "-5px",
            marginBottom: "10px",
            color: "#646872",
          }}
        >
          Vous pouvez ajoutez le numéro pour davantage de précision.
        </FormHelperText>
        <Input
          type="text"
          variant="soft"
          placeholder="10 rue Succursale"
          defaultValue={street}
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
        <FormLabel>Code postal</FormLabel>
        <Input
          type="text"
          variant="soft"
          placeholder="33000"
          defaultValue={postCode}
          {...register("postCode", {
            required: "Ce champs est requis",
            pattern: {
              value: /^[0-9]{5}$/,
              message: "Le code postale doit contenir 5 chiffres",
            },
          })}
        />
        {errors.postCode && (
          <FormHelperText>{errors.postCode.message}</FormHelperText>
        )}
      </FormControl>

      {!isLoading && (
        <Button fullWidth type="submit">
          Valider
        </Button>
      )}
      {isLoading && (
        <Button fullWidth disabled>
          <CircularProgress />
        </Button>
      )}
    </form>
  );
};

export default AddressForm;