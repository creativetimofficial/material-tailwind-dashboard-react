import React from "react";
import PersonIcon from '@mui/icons-material/Person';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "../styles.css"
import panelIcon from "../../../assets/images/icons/settings/panel.png"

const MultiStepProgressBar = (props) => {
  return (
    <ProgressBar
      percent={(props.step * 50)}
      filledBackground="#1695DC"
      height="10px"
      width="100%"
    
    >
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
            style={{
                backgroundColor: `${accomplished ? "#1695DC" : "#D9D9D9"}`
            }}
            className={[`step ${accomplished ? "completed" : null}`, "step"]}
          >
            <PersonIcon
                color="white"
                sx={{
                    fontSize: 40,
                }}
            
            />
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
            style={{
                backgroundColor: `${accomplished ? "#1695DC" : "#D9D9D9"}`
            }}
            className={[`step ${accomplished ? "completed" : null}`, "step"]}
          >
            <GroupIcon
                color="white"
                sx={{
                    fontSize: 40,
                }}
            
            />
            
          </div>
        )}
      </Step>
        <Step transition="scale">
            {({ accomplished, index }) => (
            <div
                style={{
                    backgroundColor: `${accomplished ? "#1695DC" : "#D9D9D9"}`
                }}
                className={[`step ${accomplished ? "completed" : null}`, "step"]}
            >
                {/* <img
                    src={panel}
                    
                    styl={{
                        color: "white",
                        fontSize: "40px",
                    }}
                /> */}
                <AdminPanelSettingsIcon
                    color="white"
                    sx={{
                        fontSize: 40,
                    }}
            
                /> 
            </div>
            )}
        </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
