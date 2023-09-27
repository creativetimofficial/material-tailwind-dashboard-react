import { useEffect } from "react";

import "../styles.css";

import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

type InputSchema = {
  noms: string;
  prenoms: string;
  birthDay: Date;
  birthPlace: Date;
  profession: string;
  téléphone: string;
  taille: string;
  sexe: string;
};

const FirstStep = () => {
  const { control } = useForm<InputSchema>();

  return (
    <>
      <Typography variant="h4" color="purple" className="mt-8">
        Informations Personnelles
      </Typography>
      <div className="mt-8 flex w-full gap-4">
        <div className="mb-4 flex w-1/2 flex-col gap-6">
          <Input color="purple" crossOrigin={null} size="lg" label="Name" />
          <Input color="purple" crossOrigin={null} size="lg" label="Prenom" />
          <Input
            color="purple"
            crossOrigin={null}
            type="date"
            size="lg"
            label="Date de naissance"
          />
          <Input
            color="purple"
            crossOrigin={null}
            size="lg"
            label="Lieu de naissance"
          />
        </div>
        <div className="mb-4 flex w-1/2 flex-col gap-6">
          <Select color="purple" size="lg" label="Sexe">
            <Option>Masculin</Option>
            <Option>Feminin</Option>
          </Select>
          <Input color="purple" crossOrigin={null} size="lg" label="Taille" />
          <Input
            color="purple"
            crossOrigin={null}
            size="lg"
            label="Profession"
          />
          <Input
            color="purple"
            crossOrigin={null}
            size="lg"
            label="Telephone"
          />
        </div>
      </div>
    </>
  );
};
export default FirstStep;
