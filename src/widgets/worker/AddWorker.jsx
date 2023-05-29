import useAddWorker from "@/apiHooks/worker/useAddWorker";
import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";

const AddWorker = ({ show }) => {
  const [name, setname] = useState("");
  const [field, setfield] = useState("");
  const addWorker = useAddWorker(show);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, field });
    addWorker({ name, field });
  };
  return (
    <>
      <div>
        <h1 className="p-7 text-center text-2xl font-medium">Add Worker</h1>
        <div>
          <form className="m-auto w-[25vw] space-y-6" onSubmit={handleSubmit}>
            <Input
              size="lg"
              required
              value={name}
              label="Enter Name"
              type="text"
              onChange={(e) => setname(e.target.value)}
            />
            <Input
              size="lg"
              required
              value={field}
              label="Enter Field"
              type="text"
              onChange={(e) => setfield(e.target.value)}
            />
            <Button className="w-full" type="submit" color="green">
              Add Worker
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddWorker;
