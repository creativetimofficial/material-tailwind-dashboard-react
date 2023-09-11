import "../styles.css";
import { Input, Typography } from "@material-tailwind/react";

// import cloud from "../../../assets/images/icons/settings/cloud.png";

const SecondStep = () => {
  return (
    <>
      <Typography variant="h4" color="purple" className="mt-8">
        Informations Supplementaires
      </Typography>
      <div className="mt-8 flex w-full gap-4">
        <div className="mb-4 flex w-1/2 flex-col gap-6">
          <Input
            color="purple"
            crossOrigin={null}
            size="lg"
            label="Noms complets du père"
          />
          <Input
            color="purple"
            crossOrigin={null}
            size="lg"
            label="Noms complets de la mère"
          />
          <Input color="purple" crossOrigin={null} size="lg" label="Adresse" />
        </div>
        <div className="mb-4 flex w-1/2 flex-col gap-6">
          <div className="relative flex h-full items-center justify-center rounded-lg border-2 border-dashed border-purple-500 bg-purple-100">
            <Input
              className="hidden"
              crossOrigin={null}
              type="file"
              size="lg"
              label="Photo"
            />
            <Typography className="absolute">
              Enter Chose your file here
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
export default SecondStep;
