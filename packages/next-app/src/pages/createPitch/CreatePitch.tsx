import { Icon } from "@iconify/react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import pitch from "@rese/client/src/assets/pitch.svg";
import type {
    FreeService,
    PaidService,
    PitchType
} from "@rese/common/model/Pitch";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import round from "lodash/round";
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createPitch } from "../../graphql/queryQL";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import LocationDialog from "../../components/LocationDialog";
import useBoolean from "../../hooks/useBoolean";
import { toggleSideBar } from "../../state/ui/uiSlice";
import { pageTransition } from "../../util/const";
import createPitchValidation from "./createPitchValidation";

interface InputProps {
  pitchName: string;
  location: Pick<PitchType, "location"> | undefined;
  phone: string;
  numberOfSubPitches?: number;
  openAt: number;
  closeAt: number;
  paidServices: PaidService[];
  freeServices: FreeService[];
}

const paidServices: PaidService[] = ["referee"];

const freeServices: FreeService[] = ["counter", "transportation", "treat"];

const CreatePitch = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [isDialogOpen, openDialog, closeDialog] = useBoolean();
  const navigate = useNavigate();
  const formik = useFormik<InputProps>({
    initialValues: {
      pitchName: "",
      phone: "",
      location: undefined,
      numberOfSubPitches: 1,
      openAt: 8,
      closeAt: 12,
      freeServices: [] as FreeService[],
      paidServices: [] as PaidService[],
    },
    validationSchema: createPitchValidation,
    onSubmit: async (values, formikHelper) => {
      if (values.closeAt !== 0 && values.openAt > values.closeAt) {
        formikHelper.setFieldError(
          "openAt",
          "open hour must precede closing hour"
        );
        await createPitch(values);
        navigate("/");
      }
    },
  });

  const handleFreeServicesChange = useCallback(
    (target, value) => {
      formik.setFieldValue("freeServices", value);
    },
    [formik]
  );

  const handlePaidServicesChange = useCallback(
    (target, value) => {
      formik.setFieldValue("paidServices", value);
    },
    [formik]
  );

  const handleClickAvatar = useCallback(() => {
    dispatch(toggleSideBar());
  }, [dispatch]);

  const handleSelectLocation = useCallback(
    (location) => {
      console.log(location);
      formik.setFieldValue("location", location);
    },
    [formik]
  );
  const locationText = useMemo(
    () =>
      `${round(formik.values.location?.location.lat ?? 0, 3)}, ${round(
        formik.values.location?.location.lng ?? 0,
        3
      )}`,
    [formik.values.location?.location.lat, formik.values.location?.location.lng]
  );
  return (
    <motion.div className={classes.container} {...pageTransition}>
      <LocationDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleSelectLocation}
      />
      <div className={classes.header}>
        <div className={classes.greenLine} />
        <div className={classes.headerContent}>
          {/* TODO: specify special avatar for every user */}

          <Avatar
            onClick={handleClickAvatar}
            src={"https://avatars.dicebear.com/api/micah/jejeiiwllf.svg"}
          />
          <Typography component={"h6"} className={classes.title}>
            Create New Pitch
          </Typography>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.inputContainer}>
          <TextField
            label="Pitch Name"
            onChange={formik.handleChange}
            name="pitchName"
            variant="outlined"
            error={formik.touched.pitchName && Boolean(formik.errors.pitchName)}
            helperText={formik.touched.pitchName && formik.errors.pitchName}
            className={classes.input}
            value={formik.values.pitchName}
          />

          <TextField
            label="location"
            name="location"
            className={classes.input}
            variant="outlined"
            value={locationText}
            onClick={openDialog}
            InputProps={{
              endAdornment: (
                <Icon
                  width={24}
                  color={"#071A52"}
                  icon="mdi:map-marker-multiple"
                />
              ),
              readOnly: true,
            }}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />

          <TextField
            label="Phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            variant="outlined"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            className={classes.input}
          />

          <TextField
            onChange={formik.handleChange}
            label="Number of sub pitches"
            type="number"
            name="numberOfSubPitches"
            value={formik.values.numberOfSubPitches}
            variant="outlined"
            error={
              formik.touched.numberOfSubPitches &&
              Boolean(formik.errors.numberOfSubPitches)
            }
            helperText={
              formik.touched.numberOfSubPitches &&
              formik.errors.numberOfSubPitches
            }
            className={classes.input}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <div className={classes.dateContainer}>
            <Typography className={classes.dateTitle}>Date</Typography>
            <TextField
              label="opens At (in hour)"
              type="number"
              name="openAt"
              className={classes.dateInput}
              value={formik.values.openAt}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={formik.handleChange}
            />

            <TextField
              label="Closes At (in hour)"
              type="number"
              name="closeAt"
              className={classes.dateInput}
              value={formik.values.closeAt}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Autocomplete
            className={classes.autoComplete}
            multiple
            onChange={handleFreeServicesChange}
            limitTags={2}
            options={freeServices}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Free Services"
                placeholder="choose free services"
              />
            )}
          />

          <Autocomplete
            className={classes.autoComplete}
            multiple
            onChange={handlePaidServicesChange}
            limitTags={2}
            options={paidServices}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Paid Services"
                placeholder="choose paid services"
              />
            )}
          />
          <Button label="Create pitch" onClick={formik.submitForm} />
        </div>
        <div className={classes.illustrationContainer}>
          <img className={classes.illustration} src={pitch} alt="pitch" />
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(CreatePitch);

const useStyle = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    boxShadow:
      "0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);",
    fontWeight: 500,
  },
  body: {
    display: "flex",
    gap: 52,
    justifyContent: "space-between",
    padding: 24,
  },
  greenLine: {
    width: "100%",
    height: 8,
    backgroundColor: theme.palette.primary.main,
  },
  avatar: {
    width: "100%",
  },
  avatarContainer: {
    maxWidth: 32,
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 500000,
  },
  headerContent: {
    padding: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  inputContainer: {
    padding: 24,
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    maxWidth: 452,
    flexWrap: "wrap",
  },
  title: {
    fontWeight: 500,
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    width: "100%",
    maxWidth: 192,
  },
  dateContainer: {
    position: "relative",
    border: `${theme.palette.divider} 1px solid`,
    borderRadius: 8,
    padding: 24,
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    width: "100%",
  },
  dateTitle: {
    position: "absolute",
    top: -10,
    backgroundColor: theme.palette.background.paper,
    padding: "0 8px",
  },
  dateInput: {
    width: 168,
  },

  illustration: {
    maxWidth: 428,
    width: "100%",
  },
  illustrationContainer: {
    alignItems: "center",
    display: "none",
    width: "100%",
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  autoComplete: {
    width: "100%",
  },
  locationIcon: {},
}));
