import { useSnackbar } from '@/hooks/SnackBar'
import SignalsReadMore from '../../components/signals/SignalsReadMore'
import { Button, Input, Textarea, Typography } from '@material-tailwind/react'
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/Auth'
import SignalApi from '@/api/Signal.api'

export function Signals() {
  const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [signals, setSignals] = useState([]);
  const [data, setData] = useState({
    signalTitle: "",
    message: "",
  });

  const { socket, account, auth } = useAuth();
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("Socket connected on notify:", socket.connected); // Should log `true` if connected
    });
  }, [socket, account]);
  const sendSignal = (e) => {
    e.preventDefault();
    if (!data.signalTitle || !data.message) {
      openSnackbar(
        "Please fill all fields",
        {
          type: "error",
          duration: 3000,
        }
      );
      return;
    }
    socket.emit("signalOut", data);
    openSnackbar("Signal sent", {
      type: "success",
      duration: 2000,
    });
    setData({ signalTitle: "", message: "" });
    setFetchAgain(!fetchAgain);
  };

  useEffect(() => {
    SignalApi.getAll(auth)
      .then((res) => {
        setSignals(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        openSnackbar("An error occurred", {
          type: "error",
          duration: 2000,
        });
      });
  }, [fetchAgain]);


  return (
    <div className='w-full h-full flex flex-col gap-10'>
      <form
        onSubmit={sendSignal}
        className="mt-8 mb-2  max-w-screen w-full grid grid-cols-1 gap-8 mx-auto"
      >
        <div className="flex flex-col items-start justify-start gap-5 w-full">
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Signal Title
          </Typography>
          <Input
            size="lg"
            type="text"
            required
            placeholder="John"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="signalTitle"
            value={data.signalTitle}
            onChange={(e) => setData({ ...data, signalTitle: e.target.value })}
          />
        </div>
        <div className="flex flex-col items-start justify-start w-full col-span-1 gap-5">
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Message
          </Typography>
          <Textarea
            labelProps={{
              className: "before:content-none after:content-none  outline-none",
            }}
            size='lg'
            name="message"
            className='w-full outline-none'
            placeholder="Here is a great deal"
            required
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
          />
        </div>
        <Button type="submit" className="mt-6 h-16 flex justify-center items-center gap-2 col-span-1 w-[240px] self-center" fullWidth>
          Send Message
          {loading && (
            <span className="flex justify-center items-center w-fit h-fit animate-spin">
              <LoaderCircle size={20} className="animate-spin" />
            </span>
          )}
        </Button>
      </form>
      <section className="flex flex-col gap-5">
        <Typography variant='h2'>
          Signals History
        </Typography>
        {signals?.map((signal) => (
          <SignalsReadMore
            key={signal._id}
            date={signal.createdAt}
            title={signal.signalTitle.en}
            content={signal.message.ar}
          />
        ))}
      </section>
    </div>
  )
}

export default Signals