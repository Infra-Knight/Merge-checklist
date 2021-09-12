import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Stack from "@material-ui/core/Stack";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import SendIcon from "@material-ui/icons/Send";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const emptyCheckItemValue = {
  description: "",
  finished: false,
};

const CheckItems = ({ featureId, checkItems, fetchCheckItemsData }) => {
  const [editingItemId, setEditingItemId] = useState(null);
  const [isCreatingNewItem, setIsCreatingNewItem] = useState(false);
  const [editItemValue, seEditItemValue] = useState(emptyCheckItemValue);

  const onFieldChange = useCallback((state, newValue, changeFunction) => {
    changeFunction({ ...state, ...newValue });
  });

  const createCheckItem = useCallback((value) => {
    axios
      .post(`/api/v1/features/${featureId}/check_items`, value)
      .then((resp) => {
        fetchCheckItemsData();
        setIsCreatingNewItem(false);
      })
      .catch((resp) => console.log(resp));
  });
  const editCheckItem = useCallback((value, id) => {
    axios
      .patch(`/api/v1/features/${featureId}/check_items/${id}`, value)
      .then((resp) => {
        setEditingItemId(null);
        fetchCheckItemsData();
      })
      .catch((resp) => console.log(resp));
  });
  const deleteCheckItem = useCallback((id) => {
    axios
      .delete(`/api/v1/features/${featureId}/check_items/${id}`)
      .then((resp) => {
        setEditingItemId(null);
        fetchCheckItemsData();
      })
      .catch((resp) => console.log(resp));
  });

  return (
    <div style={{ margin: "0px 10px 0px" }}>
      <Typography style={{ marginBottom: 20 }}>Check Items:</Typography>
      <Stack spacing={1} divider={<Divider />}>
        {checkItems.map(
          ({ id, attributes: { description, finished } }, index) => (
            <div key={index + description}>
              {editingItemId !== id && (
                <div
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    justifyContent: "space-between",
                  }}
                  onClick={() => {
                    setEditingItemId(id);
                    setIsCreatingNewItem(false);
                    seEditItemValue({ description, finished });
                  }}
                >
                  <Typography
                    style={{
                      color: "#1976D2",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {description}
                  </Typography>
                  {finished && <CheckIcon color="success" />}
                </div>
              )}
              {editingItemId === id && (
                <>
                  <div style={{ display: "flex" }}>
                    <TextField
                      variant="outlined"
                      name="edit_check_item"
                      label="Edit Check Item"
                      style={{ flex: "3 1 auto", marginRight: 5 }}
                      onChange={(e) =>
                        onFieldChange(
                          editItemValue,
                          { description: e.target.value },
                          seEditItemValue
                        )
                      }
                      value={editItemValue.description}
                      InputLabelProps={{ shrink: true }}
                    />
                    <Select
                      name="status"
                      label="Status"
                      style={{ flex: "0 1 auto" }}
                      labelId="status-select-label"
                      value={editItemValue.finished}
                      onChange={(e) =>
                        onFieldChange(
                          editItemValue,
                          { finished: e.target.value },
                          seEditItemValue
                        )
                      }
                      /* InputLabelProps={{ shrink: true }} */
                    >
                      <MenuItem value="false">Not Done</MenuItem>
                      <MenuItem value="true">Done</MenuItem>
                    </Select>
                  </div>
                  {/* <IconButton */}
                  {/*   style={{ color: "#D32F2F" }} */}
                  {/*   onClick={() => { */}
                  {/*     setEditingItemId(null); */}
                  {/*     seEditItemValue(emptyCheckItemValue); */}
                  {/*   }} */}
                  {/* > */}
                  {/*   <CloseIcon /> */}
                  {/* </IconButton> */}
                  <div style={{ textAlign: "end" }}>
                    <Button
                      color="inherit"
                      onClick={() => {
                        setEditingItemId(null);
                        seEditItemValue(emptyCheckItemValue);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button color="error" onClick={() => deleteCheckItem(id)}>
                      Delete
                    </Button>
                    <Button onClick={() => editCheckItem(editItemValue, id)}>
                      Save
                    </Button>
                  </div>
                </>
              )}
            </div>
          )
        )}
        <div>
          {!isCreatingNewItem && (
            <IconButton
              style={{ padding: 0, color: "#1976D2" }}
              onClick={() => {
                setEditingItemId(null);
                setIsCreatingNewItem(true);
                seEditItemValue(emptyCheckItemValue);
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
          {isCreatingNewItem && (
            <>
              <div style={{ paddingTop: 10 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="new_check_item"
                  label="New Check Item"
                  value={editItemValue.description}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>
                    onFieldChange(
                      editItemValue,
                      { description: e.target.value },
                      seEditItemValue
                    )
                  }
                />
              </div>
              <div style={{ textAlign: "end" }}>
                <IconButton
                  style={{ color: "#D32F2F" }}
                  onClick={() => {
                    setIsCreatingNewItem(false);
                    seEditItemValue(emptyCheckItemValue);
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setIsCreatingNewItem(false);
                    createCheckItem(editItemValue);
                  }}
                >
                  <SendIcon color="primary" />
                </IconButton>
              </div>
            </>
          )}
        </div>
      </Stack>
    </div>
  );
};

export default CheckItems;
