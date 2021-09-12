import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import format from "date-fns/format";
import Stack from "@material-ui/core/Stack";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import MobileDatePicker from "@material-ui/lab/MobileDatePicker";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";

import CheckItems from "../CheckItems";

export const CreateFeature = () => {
  const history = useHistory();
  const [featureValues, setFeatureValues] = useState({
    name: "",
    status: "",
    release_date: "",
    description: "",
  });

  const onTextFieldChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFeatureValues({
        ...featureValues,
        [name]: value,
      });
    },
    [featureValues]
  );
  const onDatePickerChange = useCallback(
    (value) => {
      setFeatureValues({
        ...featureValues,
        release_date: value,
      });
    },
    [featureValues]
  );
  const cancelCreate = useCallback(() => history.push(`/`), [history]);
  const handleSubmit = useCallback(() => {
    axios
      .post("/api/v1/features", featureValues)
      .then((resp) => {
        history.push(`/`);
      })
      .catch((resp) => console.log(resp));
  }, [featureValues]);

  return (
    <div style={{ maxWidth: 500, margin: "30 auto" }}>
      <Stack spacing={3}>
        <TextField
          required
          fullWidth
          name="name"
          variant="outlined"
          label="Feature Name"
          value={featureValues.name}
          onChange={onTextFieldChange}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            name="status"
            label="Status"
            value={featureValues.status}
            onChange={onTextFieldChange}
            labelId="status-select-label"
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="In Review">In Review</MenuItem>
            <MenuItem value="Merged">Merged</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            clearable
            inputFormat="dd/MM/yyyy"
            label="Feature release date"
            onChange={onDatePickerChange}
            value={featureValues.release_date}
            InputLabelProps={{ shrink: true }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          required
          fullWidth
          multiline
          name="description"
          variant="outlined"
          label="Feature Description"
          onChange={onTextFieldChange}
          value={featureValues.description}
          InputLabelProps={{ shrink: true }}
        />
        <div style={{ textAlign: "end" }}>
          <Button color="inherit" onClick={cancelCreate}>
            CANCEL
          </Button>
          <Button onClick={handleSubmit}>CREATE</Button>
        </div>
      </Stack>
    </div>
  );
};

const EditFeature = ({
  fetchData,
  formValues,
  setIsEditing,
  setFormValues,
  selectedFeatureId,
  featureId,
  checkItems,
  fetchCheckItemsData,
}) => {
  const onTextFieldChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    },
    [formValues]
  );
  const onDatePickerChange = useCallback(
    (value) => {
      setFormValues({
        ...formValues,
        release_date: value,
      });
    },
    [formValues]
  );
  const cancelEdit = useCallback(() => setIsEditing(false), [setIsEditing]);
  const handleSubmit = useCallback(() => {
    axios
      .patch(`/api/v1/features/${selectedFeatureId}`, formValues)
      .then((resp) => {
        fetchData();
        setIsEditing(false);
      })
      .catch((resp) => console.log(resp));
  }, [formValues, selectedFeatureId, setIsEditing]);

  return (
    <div style={{ maxWidth: 500, margin: "30 auto" }}>
      <Stack spacing={3}>
        <TextField
          required
          fullWidth
          name="name"
          variant="outlined"
          label="Feature Name"
          value={formValues.name}
          onChange={onTextFieldChange}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            name="status"
            label="Status"
            value={formValues.status}
            onChange={onTextFieldChange}
            labelId="status-select-label"
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="In Review">In Review</MenuItem>
            <MenuItem value="Merged">Merged</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            clearable
            inputFormat="dd/MM/yyyy"
            label="Feature release date"
            onChange={onDatePickerChange}
            value={formValues.release_date}
            InputLabelProps={{ shrink: true }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          required
          fullWidth
          multiline
          name="description"
          variant="outlined"
          label="Feature Description"
          onChange={onTextFieldChange}
          value={formValues.description}
          InputLabelProps={{ shrink: true }}
        />
        <div style={{ textAlign: "end" }}>
          <Button color="inherit" onClick={cancelEdit}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </Stack>
    </div>
  );
};

const FeatureDetail = ({
  formValues,
  checkItems,
  setIsEditing,
  featureId,
  fetchCheckItemsData,
}) => {
  const history = useHistory();

  const onGoBack = useCallback(
    (featureId) => {
      history.push(`/`);
    },
    [history]
  );
  const deleteFeature = useCallback(() => {
    axios
      .delete(`/api/v1/features/${featureId}`)
      .then((resp) => {
        onGoBack();
      })
      .catch((resp) => console.log(resp));
  });
  const onEditClick = useCallback(() => setIsEditing(true), [setIsEditing]);

  return (
    <>
      <Button
        onClick={onGoBack}
        startIcon={<NavigateBeforeOutlinedIcon />}
        style={{ marginBottom: 20 }}
      >
        Back
      </Button>
      <div
        style={{
          rowGap: 20,
          columnGap: 20,
          display: "grid",
          margin: "0px 10px 0px",
          gridTemplate: "none / 1fr 2fr",
        }}
      >
        <Typography>Feature Name:</Typography>
        <Typography style={{ overflowWrap: "anywhere" }}>
          {formValues.name}
        </Typography>

        <Typography>Status:</Typography>
        <Typography>{formValues.status}</Typography>

        <Typography>Release Date:</Typography>
        <Typography>
          {formValues.release_date
            ? format(formValues.release_date, "yyyy-MM-dd")
            : ""}
        </Typography>

        <>
          <Typography>Description:</Typography>
          <Typography>{formValues.description}</Typography>
        </>
        <div />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button color="error" onClick={deleteFeature}>
            DELETE
          </Button>
          <Button onClick={onEditClick}>EDIT</Button>
        </div>
        <></>
      </div>
      <CheckItems
        featureId={featureId}
        checkItems={checkItems}
        fetchCheckItemsData={fetchCheckItemsData}
      />
    </>
  );
};

const Feature = () => {
  const { selectedFeatureId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    status: "",
    release_date: "",
    description: "",
  });
  const [checkItems, setCheckItems] = useState([]);

  const fetchData = useCallback(() => {
    axios
      .get(`/api/v1/features/${selectedFeatureId}`)
      .then((resp) => {
        console.log(resp.data.data);
        setFormValues({
          ...resp.data.data.attributes,
          ...(resp.data.data.attributes.release_date && {
            release_date: new Date(resp.data.data.attributes.release_date),
          }),
        });
      })
      .catch((resp) => console.log(resp));
  });
  const fetchCheckItemsData = useCallback(() => {
    axios
      .get(`/api/v1/features/${selectedFeatureId}/check_items`)
      .then((resp) => {
        console.log("after fetchCheckItemsData");
        console.log(resp.data.data);
        setCheckItems(resp.data.data);
      })
      .catch((resp) => console.log(resp));
  });

  useEffect(() => {
    fetchData();
    fetchCheckItemsData();
  }, []);

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "30 auto",
      }}
    >
      {!isEditing && (
        <FeatureDetail
          formValues={formValues}
          checkItems={checkItems}
          setIsEditing={setIsEditing}
          featureId={selectedFeatureId}
          fetchCheckItemsData={fetchCheckItemsData}
        />
      )}
      {isEditing && (
        <EditFeature
          fetchData={fetchData}
          formValues={formValues}
          checkItems={checkItems}
          setIsEditing={setIsEditing}
          featureId={selectedFeatureId}
          setFormValues={setFormValues}
          selectedFeatureId={selectedFeatureId}
          fetchCheckItemsData={fetchCheckItemsData}
        />
      )}
    </div>
  );
};
export default Feature;
