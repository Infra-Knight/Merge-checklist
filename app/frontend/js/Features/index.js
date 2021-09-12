import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";

const Features = () => {
  const history = useHistory();
  const [features, setFeatures] = useState([]);

  useEffect(
    () =>
      axios
        .get("api/v1/features.json")
        .then((resp) => {
          setFeatures(resp.data.data);
        })
        .catch((resp) => console.log(resp)),
    []
  );

  const creatFeature = useCallback(() => {
    history.push(`/features/create`);
  }, [history]);

  const viewFeature = useCallback(
    (featureId) => {
      history.push(`/features/${featureId}`);
    },
    [history]
  );

  return (
    <div style={{ maxWidth: 1000, margin: "30 auto" }}>
      <div
        style={{
          display: "flex",
          marginBottom: 10,
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="inherit"
          onClick={() => {
            creatFeature();
            console.log("haha");
            console.log("haha");
          }}
        >
          NEW FEATURE
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Feature Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Release Date</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {features.map(({ id, attributes }) => (
              <TableRow
                key={id}
                onClick={() => viewFeature(id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell style={{ overflowWrap: "anywhere" }}>
                  {attributes?.name}
                </TableCell>
                <TableCell>{attributes?.status}</TableCell>
                <TableCell>{attributes?.release_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Features;
