/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components

// Data
import "./styles.css";
import { Card } from "@material-tailwind/react";

function AddStudent() {
  return (
    <div className="pt-6 pb-3">
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <div className="pt-3">
              <div className="m-[1.25rem]">
                <UserForm />
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddStudent;
