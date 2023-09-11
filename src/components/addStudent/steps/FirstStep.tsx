import React, { useEffect } from "react";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box";
import InputTextUI from "./utils/InputTextUI";
import "../styles.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FirstStep = (props) => {
  // const handleChange = (event) => {
  //   setName(event.target.value);
  //   console.log(props.names)
  // };
  useEffect(() => {
    console.log(props.names);
  }, [props.names]);

  return (
    <div className="form">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "80%" },
          // width: '100%',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          className="textField"
          id="outlined-basic"
          label="noms"
          variant="outlined"
          value={props.names}
          onChange={(event) => props.handleChangeName(event)}
        />
        <TextField
          className="textField"
          id="outlined-basic"
          label="prenoms"
          variant="outlined"
          value={props.surName}
          onChange={(event) => props.handleChangeSurName(event)}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="date de naissance"
            inputFormat="MM/DD/YYYY"
            value={props.birthDay}
            onChange={(value) =>
              props.handleChangeBirthDay({
                target: { value: value.toDate() },
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <TextField
          className="textField"
          id="outlined-basic"
          label="lieu de naissance"
          variant="outlined"
          value={props.birthPlace}
          onChange={(event) => props.handleChangeBirthPlace(event)}
        />
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { marginBlock: 1, width: "100%" },
          // width: '100%',
          // marginLeft: "50px"
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl className="textField">
          <InputLabel
            id="demo-simple-select-label"
            className="textField"
          >
            sexe
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.gender}
            label="sexe"
            onChange={props.handleChangeGender}
            className="textField"
            style={{
              height: 45,
            }}
          >
            <MenuItem value="male">Masculin</MenuItem>
            <MenuItem value="female">Feminin</MenuItem>
          </Select>
        </FormControl>

        <TextField
          className="textField"
          id="outlined-basic"
          label="taille"
          variant="outlined"
          value={props.height}
          onChange={(event) => props.handleChangeHeight(event)}
        />
        <TextField
          className="textField"
          id="outlined-basic"
          label="profession"
          variant="outlined"
          value={props.job}
          onChange={(event) => props.handleChangeJob(event)}
        />
         <TextField
          className="textField"
          id="outlined-basic"
          label="téléphone"
          variant="outlined"
          value={props.phone}
          onChange={(event) => props.handleChangePhone(event)}
        />
      </Box>
    </div>
  );
};
export default FirstStep;

// gender={gender}
// height={height}
// job={job}
