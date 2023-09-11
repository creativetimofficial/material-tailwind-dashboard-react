import React, { useContext, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@mui/material/Button";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

import MultiStepProgressBar from "./MultiStepProgressBar";
import "../styles.css";
import dayjs from "dayjs";
import { generateImage } from "utils";
import { CitizenFetcher } from "api";
import Loader from "examples/Loaders";

import { Navigate, useLocation } from 'react-router-dom'
import CitizenContext from "context/citizens";
import { Citizen } from "entities/citizen.entity";

const fetcher = new CitizenFetcher();

const UserForm = () => {
  // Global state
  const { addCitizen } = useContext(CitizenContext)

  //For manageing state of multi steps Form
  const [page, setPage] = useState(0);
  const [erreur1, setErreur1] = useState(false);
  const [erreur2, setErreur2] = useState(false);

  const [names, setNames] = useState("");
  const [surName, setSurNames] = useState("");
  const [birthDay, setBirthDay] = useState(
    dayjs(new Date(Date.now)).toDate()
  );
  const [birthPlace, setBirthPlace] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [job, setJob] = useState("");
  const [dadName, setDadName] = useState("");
  const [munName, setMunName] = useState("");
  const [adress, setAdress] = useState("");
  const [station, setStation] = useState("CE02");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState(0);
  

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  //managing state in one objet
  const userInput = {
    names: names,
    surName: surName,
    birthDay: birthDay,
    birthPlace: birthPlace,
    gender: gender,
    height: height,
    job: job,
    dadName: dadName,
    munName: munName,
    adress: adress,
    station: station,
  };

  // Some handlers
  const handleSubmit = async () => {
    if (loading) return;

    const data = {
      firstname: names,
      lastname: surName,
      phone,
      avatar: generateImage(),
      birthDate: new Date(birthDay).getTime(),
      birthPlace,
      size: height,
      gender,
      profession: job,
      address: adress,
      cniDeliveryDate: dayjs(new Date(Date.now())).format(
        "YYYY-MM-DD"
      ),
      fathername: dadName,
      mothername: munName,
    };

    // Start loading
    setLoading(true)

    const response = await fetcher.createCitizen(data);

    // Stop loading
    setLoading(false)

    if (response.data) {
      console.log(response.data)

      const citizen = new Citizen(response.data)

      addCitizen(citizen);
      setRedirect(true);
    } else {
      console.log(response.error)
    }
  };

  //for name
  const handleChangeName = (e) => {
    setNames(e.target.value);
  };
  const handleChangeSurName = (e) => {
    setSurNames(e.target.value);
  };
  const handleChangeBirthDay = (e) => {
    setBirthDay(e.target.value);
  };
  const handleChangeBirthPlace = (e) => {
    setBirthPlace(e.target.value);
    console.log("the user", names);
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  const handleChangeHeight = (e) => {
    setHeight(e.target.value);
  };
  const handleChangeJob = (e) => {
    setJob(e.target.value);
  };
  const handleChangeDadName = (e) => {
    setDadName(e.target.value);
  };
  const handleChangeMunName = (e) => {
    setMunName(e.target.value);
  };
  const handleChangeAdress = (e) => {
    setAdress(e.target.value);
  };
  const handleChangeStation = (e) => {
    setStation(e.target.value);
  };
  const handleChangeImage = (e) => {
    console.log(e.target);
    setImage(e.target.files[0]);
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const nextStep = () => {
    if (page === pageSubTitiles.length - 1) {
      handleSubmit();
    } else {
      if (
        names &&
        surName &&
        birthDay &&
        birthPlace &&
        gender &&
        height &&
        job &&
        page === 0
      ) {
        setPage((currPage) => currPage + 1);
        setErreur1(false);
      } else if (page === 0) {
        setErreur1(true);
      }

      if (dadName && munName && adress && page === 1) {
        setPage((currPage) => currPage + 1);
        setErreur2(false);
      } else if (page === 1) {
        setErreur2(true);
      }
    }
  };

  const pageTitles = [
    "Information personelle",
    "Information suplementaire",
    "Information complementaire",
  ];
  const pageSubTitiles = [
    "veillez a remplir tous les champs d'informations.",
    "Remplissez tout information suplementaire",
    "Renseigner votre poste d'identification.",
  ];

  const PageDisplay = () => {
    if (page === 0)
      return (
        <FirstStep
          nextStep={nextStep}
          names={names}
          surName={surName}
          birthDay={birthDay}
          birthPlace={birthPlace}
          gender={gender}
          height={height}
          job={job}
          phone={phone}
          handleChangeName={handleChangeName}
          handleChangeSurName={handleChangeSurName}
          handleChangeBirthDay={handleChangeBirthDay}
          handleChangeBirthPlace={handleChangeBirthPlace}
          handleChangeGender={handleChangeGender}
          handleChangeHeight={handleChangeHeight}
          handleChangeJob={handleChangeJob}
          handleChangePhone={handleChangePhone}
        />
      );
    else if (page === 1)
      return (
        <SecondStep
          nextStep={nextStep}
          dadName={dadName}
          munName={munName}
          adress={adress}
          image={image}
          handleChangeDadName={handleChangeDadName}
          handleChangeMunName={handleChangeMunName}
          handleChangeAdress={handleChangeAdress}
          handleChangeImage={handleChangeImage}
        />
      );
    else
      return (
        <ThirdStep
          nextStep={nextStep}
          station={station}
          handleChangeStation={handleChangeStation}
        />
      );
  };

  if (redirect) {
    return <Navigate to="/citizens" />;
  }

  return (
    <div className="userForm">
      <div style={{ margin: "40px auto", width: "95%" }}>
        <MultiStepProgressBar step={page} />
      </div>

      <div className="userForm-container">
        <div className="userForm-container-header">
          <h2 className="colorTitle">
            {page === pageTitles.length
              ? `Congratulations, ` + userInput.displayname
              : pageTitles[page]}
          </h2>
          {erreur1 && page === 0 ? (
            <p className="errorSigne">{pageSubTitiles[page]}</p>
          ) : erreur2 && page === 1 ? (
            <p className="errorSigne">{pageSubTitiles[page]}</p>
          ) : null}
        </div>
        <div className="userForm-container-body">{PageDisplay()}</div>
        <div className="userForm-footer">
          <div>
            {page === 0 ? null : (
              <Button
                variant="contained"
                sx={{
                  color: "#FFF",
                  maxHeight: 50,
                  backgroundColor: "#C0C0C0",
                  "&:hover": { backgroundColor: "transparent" },
                }}
                startIcon={
                  <KeyboardBackspaceIcon
                    color="white"
                    sx={{
                      height: 40,
                      // width: 40,
                      fontSize: 40,
                    }}
                  />
                }
                onClick={() => {
                  if (page > 0) setPage((currPage) => currPage - 1);
                }}
              >
                Précédent
              </Button>
            )}
          </div>

          <div>
            {page === pageTitles.length - 1 ? (
              <Button
                variant="contained"
                sx={{
                  color: "#FFF",
                  height: 50,
                  width: 140,
                }}
                onClick={() => {
                  if (page === pageSubTitiles.length - 1) {
                    handleSubmit();
                  } else {
                    console.log(
                      "step value",
                      names &&
                        surName &&
                        birthDay &&
                        birthPlace &&
                        gender &&
                        height &&
                        job &&
                        page === 0
                    );
                    if (
                      names &&
                      surName &&
                      birthDay &&
                      birthPlace &&
                      gender &&
                      height &&
                      job &&
                      page === 0
                    ) {
                      setPage((currPage) => currPage + 1);
                    }
                    if (dadName && munName && adress && page === 1) {
                      setPage((currPage) => currPage + 1);
                    }
                  }
                }}
              >
                Valider

                {
                  !loading ? null : (
                    <Loader 
                      size={20}
                      color={"#FFF"}
                      bottom={15}
                      left={10}
                    />
                  )
                }
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  color: "#FFF",
                  maxHeight: 50,
                  width: 140,
                }}
                endIcon={
                  <ArrowRightAltIcon
                    color="white"
                    sx={{
                      height: 40,
                      // width: 40,
                      fontSize: 40,
                    }}
                  />
                }
                onClick={nextStep}
              >
                Suivant
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
