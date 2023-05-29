import React, { useState } from "react";
import ShowButtons from "@/widgets/htmlComponents/ShowButtons";
import AddWorker from "@/widgets/worker/AddWorker";
import ListWorkers from "@/widgets/worker/ListWorkers";
export const Worker = () => {
  const [show, setshow] = useState(true);

  return (
    <>
      <div>
        <ShowButtons
          button1={"View Workers"}
          button2={"Add Worker"}
          setshow={setshow}
        />
        {show && (
          <div>
            <ListWorkers />
          </div>
        )}
        {!show && (
          <div>
            <AddWorker show={setshow} />
          </div>
        )}
      </div>
    </>
  );
};

export default Worker;
