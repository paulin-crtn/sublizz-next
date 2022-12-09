/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import randomToken from "rand-token";
import toast from "react-hot-toast";
/* ------------------------------- COMPONENTS ------------------------------- */
import LeaseInputFile from "./lease-input-file";
import ModalLayout from "../../shared/modal-layout";
import AddressForm from "./address-form";
import Optional from "../../shared/optional";
/* ---------------------------------- UTILS --------------------------------- */
import { storeLease, updateLease } from "../../../utils/fetch/fetchLease";
import { convertLeaseType } from "../../../utils/convertLeaseType";
import {
  storeLeaseImages,
  destroyLeaseImages,
} from "../../../utils/fetch/fetchLeaseImages";
/* ----------------------------------- MUI ---------------------------------- */
import { MobileDatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Alert from "@mui/joy/Alert";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
/* ---------------------------------- ICONS --------------------------------- */
import ErrorIcon from "@mui/icons-material/Error";
import ClearIcon from "@mui/icons-material/Clear";
/* ---------------------------------- ENUM ---------------------------------- */
import { LeaseTypeEnum } from "../../../enum/LeaseTypeEnum";
/* ---------------------------------- CONST --------------------------------- */
import { TOAST_STYLE } from "../../../const/toastStyle";
/* ------------------------------- INTERFACES ------------------------------- */
import { ILeaseDetail, ILeaseForm } from "../../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const EditLease = ({ lease }: { lease: ILeaseDetail | undefined }) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [openAddress, setOpenAddress] = useState<boolean>(false);
  const [dataGouvAddress, setDataGouvAddress] = useState<any>();
  const [leaseImagesToRemove, setLeaseImagesToRemove] = useState<string[]>([]);
  const [inputFiles, setInputFiles] = useState<Blob[]>([]);
  const [hasInputFileError, setHasInputFileError] = useState<boolean>(false);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);

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
  } = useForm<ILeaseForm>({
    mode: "onTouched",
  });
  const { errors } = formState;

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
  }, [dataGouvAddress, clearErrors, setValue]);

  /* ------------------------------ USE MUTATION ------------------------------ */
  const { mutate, isLoading, isError, error } = useMutation(
    (payload: ILeaseForm) =>
      lease ? updateLease(lease.id, payload) : storeLease(payload),
    {
      onSuccess: async () => {
        toast.success(lease ? "Annonce modifiée" : "Annonce enregistrée", {
          style: TOAST_STYLE,
        });
        router.push("/dashboard/leases");
      },
    }
  );

  /* -------------------------------- FUNCTION -------------------------------- */
  const buildFormData = (inputFiles: File[] | Blob[]): FormData => {
    const formData = new FormData();
    for (const file of inputFiles) {
      formData.append("leaseImages", file);
      formData.append("fileNames", randomToken.generate(10) + ".jpg");
    }
    return formData;
  };

  const buildFileNames = (
    lease: ILeaseDetail | undefined,
    storedFileNames: string[]
  ) => {
    if (!lease || !lease.leaseImages?.length) {
      return storedFileNames;
    }
    // Update (keep images in the correct order)
    const updatedFileNames: string[] = lease.leaseImages
      .map((imageName: string) =>
        leaseImagesToRemove.includes(imageName)
          ? storedFileNames.shift()
          : imageName
      )
      // because shift() can return undefined
      .filter((imageName): imageName is string => imageName !== undefined);
    // Spread remaining storedFileNames (if any)
    return [...updatedFileNames, ...storedFileNames];
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    // Prevent default
    e.preventDefault();
    // Upload file
    if (inputFiles && !!inputFiles.length) {
      try {
        setIsUploadingFile(true);
        const formData = buildFormData(inputFiles);
        const storedFileNames: string[] = await storeLeaseImages(formData);
        const fileNames = buildFileNames(lease, storedFileNames);
        setValue("leaseImages", fileNames);
        if (!!leaseImagesToRemove.length) {
          await destroyLeaseImages(leaseImagesToRemove);
        }
      } catch (err) {
        err instanceof Error
          ? toast.error(err.message, { style: TOAST_STYLE })
          : toast.error("An error occured while uploading the file", {
              style: TOAST_STYLE,
            });
      } finally {
        setIsUploadingFile(false);
      }
    }
    // Submit form
    handleSubmit(mutateSubmit)();
  };

  const mutateSubmit: SubmitHandler<ILeaseForm> = async (payload) => {
    mutate({ ...lease, ...payload });
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <form onSubmit={onSubmit}>
      <FormControl error={!!errors.type}>
        <FormLabel>Type</FormLabel>
        <Controller
          name="type"
          control={control}
          rules={{ required: "Ce champs est requis" }}
          defaultValue={lease ? lease.type : null} // Avoid error "A component is changing the uncontrolled value state to be controlled."
          render={({ field: { onChange, ...field } }) => (
            <Select
              variant="soft"
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

      <Box display="flex" gap={2}>
        <FormControl error={!!errors.startDate} sx={{ flex: "1 1" }}>
          <FormLabel>Disponible à partir du</FormLabel>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "Ce champs est requis" }}
            defaultValue={lease ? lease.startDate : null} // Null value avoid to have the current date by default
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
                maxDate={watch("endDate")}
                inputFormat="dd/MM/yyyy"
              />
            )}
          />
          {errors.startDate && (
            <FormHelperText>{errors.startDate.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl sx={{ flex: "1 1", marginRight: 0.5 }}>
          <FormLabel>
            Jusqu'au <Optional />
          </FormLabel>
          <Controller
            name="endDate"
            control={control}
            defaultValue={lease ? lease.endDate : null} // Null value avoid to have the current date by default
            render={({ field: { onChange, ...field } }) => (
              <MobileDatePicker
                onChange={(event) => {
                  onChange(event);
                }}
                renderInput={(params) => (
                  <Box display="flex">
                    <TextField {...params} sx={{ flex: "1 1" }} />
                    <Button
                      variant="soft"
                      color="neutral"
                      onClick={() => setValue("endDate", null)}
                      sx={{ marginLeft: 0.5 }}
                    >
                      <ClearIcon />
                    </Button>
                  </Box>
                )}
                {...field}
                closeOnSelect
                disablePast
                minDate={watch("startDate")}
                inputFormat="dd/MM/yyyy"
              />
            )}
          />
        </FormControl>
      </Box>

      <FormControl>
        <FormLabel>Dates flexibles</FormLabel>
        <Controller
          name="isDateFlexible"
          control={control}
          defaultValue={lease ? String(lease.isDateFlexible) : "1"}
          render={({ field: { onChange, ...field } }) => (
            <RadioGroup
              aria-labelledby="is-date-flexible-label"
              {...field}
              onChange={(event) => {
                onChange(event);
              }}
            >
              <Box display="flex" gap="10px">
                <Radio label="Oui" value="1" variant="soft" disableIcon />
                <Radio label="Non" value="0" variant="soft" disableIcon />
              </Box>
            </RadioGroup>
          )}
        />
        {errors.isDateFlexible && (
          <FormHelperText>{errors.isDateFlexible.message}</FormHelperText>
        )}
      </FormControl>

      {/**
       * Here the "street" key is only used for display, validation and error purpose.
       * Address (street, postCode and city) are handled in AdressForm component
       * and updated via react-hook-form's setValue method in a useEffect hook above.
       */}
      <FormControl error={!!errors.street}>
        <FormLabel>Adresse</FormLabel>
        {getValues("street") || lease?.street ? (
          <Alert
            variant="soft"
            color="neutral"
            sx={{ marginBottom: 1, paddingY: 0.5 }}
          >
            <Typography>
              {getValues("street") ?? lease?.street},{" "}
              {getValues("postCode") ?? lease?.postCode}{" "}
              {getValues("city") ?? lease?.city}
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
                  Renseigner l'adresse
                </Button>
              )}
            />
            {errors.street && (
              <FormHelperText>{errors.street.message}</FormHelperText>
            )}
          </>
        )}
      </FormControl>

      <Box display="flex" gap={2}>
        <FormControl error={!!errors.room} sx={{ flex: "1 1" }}>
          <FormLabel>Nombre de pièces</FormLabel>
          <FormHelperText
            sx={{
              marginTop: "-5px",
              marginBottom: "10px",
              color: "#646872",
            }}
          >
            Hors cuisine et salle de bain.
          </FormHelperText>
          <Input
            type="number"
            variant="soft"
            defaultValue={lease ? lease.room : undefined}
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
          {errors.room && (
            <FormHelperText>{errors.room.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl error={!!errors.surface} sx={{ flex: "1 1" }}>
          <FormLabel>Surface</FormLabel>
          <FormHelperText
            sx={{
              marginTop: "-5px",
              marginBottom: "10px",
              color: "#646872",
            }}
          >
            En m2.
          </FormHelperText>
          <Input
            type="number"
            variant="soft"
            defaultValue={lease ? lease.surface : undefined}
            {...register("surface", {
              valueAsNumber: true,
              required: "Ce champs est requis",
              min: {
                value: 10,
                message: "10m2 minimum",
              },
              max: {
                value: 200,
                message: "200m2 maximum",
              },
            })}
          />
          {errors.surface && (
            <FormHelperText>{errors.surface.message}</FormHelperText>
          )}
        </FormControl>
      </Box>

      <FormControl error={!!errors.pricePerMonth} sx={{ flex: "1 1" }}>
        <FormLabel>Prix par mois</FormLabel>
        <FormHelperText
          sx={{
            marginTop: "-5px",
            marginBottom: "10px",
            color: "#646872",
          }}
        >
          Charges comprises, en euros.
        </FormHelperText>
        <Input
          type="number"
          variant="soft"
          defaultValue={lease ? lease.pricePerMonth : undefined}
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
          Description <Optional />
        </FormLabel>
        <FormHelperText
          sx={{
            marginTop: "-5px",
            marginBottom: "10px",
            color: "#646872",
          }}
        >
          Dites en un peu plus sur le logement mis en location
        </FormHelperText>
        <Textarea
          variant="soft"
          defaultValue={lease ? lease.description : ""}
          {...register("description")}
          minRows={5}
          maxRows={5}
        />
      </FormControl>

      <Box sx={{ flex: "0 0" }}>
        <FormLabel>
          Photos <Optional />
        </FormLabel>
        <FormHelperText
          sx={{
            marginTop: "-5px",
            marginBottom: "10px",
            color: hasInputFileError ? "#d3232f" : "auto",
          }}
        >
          Format : JPG ou PNG. Poids max : 5Mo.
        </FormHelperText>
        <Box sx={{ display: "flex", gap: 2 }}>
          {[...Array(4)].map((u, i) => (
            <FormControl key={i}>
              <LeaseInputFile
                leaseImages={lease?.leaseImages ?? []}
                setLeaseImagesToRemove={setLeaseImagesToRemove}
                setHasInputFileError={setHasInputFileError}
                inputFiles={inputFiles}
                setInputFiles={setInputFiles}
                index={i}
              />
            </FormControl>
          ))}
        </Box>
      </Box>

      <FormControl>
        <FormLabel>Publier</FormLabel>
        <Controller
          name="isPublished"
          control={control}
          defaultValue={lease ? String(lease.isPublished) : "1"}
          render={({ field: { onChange, ...field } }) => (
            <RadioGroup
              aria-labelledby="is-published-label"
              {...field}
              onChange={(event) => {
                onChange(event);
              }}
            >
              <Box display="flex" gap="10px">
                <Radio
                  label="Maintenant"
                  value="1"
                  variant="soft"
                  disableIcon
                />
                <Radio label="Plus tard" value="0" variant="soft" disableIcon />
              </Box>
            </RadioGroup>
          )}
        />
      </FormControl>

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

      {!isLoading && !isUploadingFile && (
        <Button type="submit">
          {lease ? "Modifier l'annonce" : "Enregistrer l'annonce"}
        </Button>
      )}
      {(isUploadingFile || isLoading) && (
        <Button disabled>
          <CircularProgress />
        </Button>
      )}

      {/** Address */}
      <Modal open={openAddress} onClose={() => setOpenAddress(false)}>
        <ModalDialog size="lg" aria-labelledby="close-modal-address">
          <ModalClose />
          <ModalLayout title="Adresse du logement">
            <AddressForm
              setDataGouvAddress={setDataGouvAddress}
              postCode={getValues("postCode") ?? lease?.postCode}
              street={getValues("street") ?? lease?.street}
            />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </form>
  );
};

export default EditLease;
