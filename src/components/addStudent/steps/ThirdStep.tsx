import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import "../styles.css";
import dayjs from "dayjs";

const ThirdStep = (props) => {
  const date = new Date(Date.now());
  const deliveryDate = dayjs(date).format("DD.MM.YYYY");
  const expirationDate = dayjs(date).add(10, "year").format("DD.MM.YYYY");


  return (
    <div className="form">
      <div style={{ width: "100%" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              width: "60vh",
              marginBottom: "10px",
            },
            // width: '100%',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="textField"
            id="outlined-basic"
            label="poste d'identification"
            variant="outlined"
            value={props.station}
            onChange={(event) => props.handleChangeStation(event)}
          />
        </Box>
        <div className="Item">
          <h4 className="titleItem">Date de délivrance</h4>
          <p className="elemItem">{ deliveryDate }</p>
        </div>
        <div className="Item">
          <h4 className="titleItem">Date d’expiration</h4>
          <p className="elemItem">{ expirationDate }</p>
        </div>
      </div>
      <div style={{ width: "90%" }}>
        <div className="Item">
          <h4 className="titleItem">Identifiant Unique</h4>
          <p className="elemItem">20190365432876</p>
        </div>
        <div className="Item">
          <h4 className="titleItem">Autorité</h4>
          <p className="elemItem">Martin MBARGA NGUÉLÉ</p>
        </div>
      </div>
    </div>
  );
};
export default ThirdStep;
