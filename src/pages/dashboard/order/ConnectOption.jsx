import React, { useState, useEffect  } from "react";
import ImageUploader from "./ImageUpLoader";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";



export function ConnectOptions() {
  const [clientCount, setClientCount] = useState(0);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [img, setImg] = useState();

  const handleSubmit = () => {
    if (!img || !input1 || !input2 || !input3) {
      alert("빈칸을 채워주세요");
      return;
    }

    console.log("input1:", input1);
    console.log("input2:", input2);
    console.log("input3:", input3);
    console.log("input3:", img);


    const formData = new FormData();
    formData.append("img", img);
    formData.append("input1", input1);
    formData.append("input2", input2);
    formData.append("input3", input3);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("img uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading img:", error);
      });
  }

  useEffect(() => {
    fetch("/clientCount")
      .then((response) => response.json())
      .then((data) => setClientCount(data.count))
      .catch((error) => console.error("Error fetching client count:", error));
  }, []);


  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
      <CardBody className="flex items-center justify-center">
          <div className="flex-1 px-4 pb-4 mb-4">
            <Typography
              variant="h3"
              color="blue-gray"
              className="text-center"
            >
              {clientCount}
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500 text-center mt-2"
            >
              유휴 대기 중인 클라이언트의 수 입니다.
            </Typography>
          </div>
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Command Options
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              각 명령에 필요한 PARAM 을 입력하세요
            </Typography>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12" style={{ gridAutoRows: "minmax(0, 1fr)" }}>
              <Card key={'1'} color="transparent" shadow={false} style={{ flexGrow: 1 }}>
                <CardBody className="p-4">
                  <Typography variant="h6" color="blue-gray" className="mt-1 mb-2">
                    키워드
                  </Typography>
                  <Typography variant="small" className="font-normal text-blue-gray-500">
                    영상을 찾기 위해 검색할 키워드를 입력해주세요. 해당 키워드로 유투브에서 영상 리스트를 조회 합니다.
                  </Typography>
                </CardBody>
                <div className="flex-grow">
                  <Input required size="md" label="검색 키워드" className="h-full w-full" value={input1} onChange={(e) => setInput1(e.target.value)} />
                </div>
              </Card>
              <Card key={'2'} color="transparent" shadow={false} style={{ flexGrow: 1 }}>
                <CardBody className="p-4">
                  <Typography variant="h6" color="blue-gray" className="mt-1 mb-2">
                    작업 간격
                  </Typography>
                  <Typography variant="small" className="font-normal text-blue-gray-500">
                    클라이언트의 접속 간격을 설정합니다. 예를 들어 5 로 입력 시, 5초의 간격으로 접속을 진행합니다.
                  </Typography>
                </CardBody>
                <div className="flex-grow">
                  <Input required size="md" label="영상 제목" className="h-full w-full" value={input2} onChange={(e) => setInput2(e.target.value)} />
                </div>
              </Card>
              <Card key={'3'} color="transparent" shadow={false} style={{ flexGrow: 1 }}>
                <CardBody className="p-4">
                  <Typography variant="h6" color="blue-gray" className="mt-1 mb-2">
                    클라이언트 수
                  </Typography>
                  <Typography variant="small" className="font-normal text-blue-gray-500">
                    영상 시청을 조회할 클라이언트 수를 설정합니다.
                  </Typography>
                </CardBody>
                <div className="flex-grow">
                  <Input required size="md" label="클라이언트 수" className="h-full w-full" value={input3} onChange={(e) => setInput3(e.target.value)} />
                </div>
              </Card>
              <Card key={'4'} color="transparent" shadow={false} style={{ flexGrow: 1 }}>
                <CardBody className="p-4">
                  <Typography variant="h6" color="blue-gray" className="mt-1 mb-2">
                    썸네일 이미지 업로드
                  </Typography>
                  <Typography variant="small" className="font-normal text-blue-gray-500">
                    영상 시청을 조회할 이미지를 업로드 합니다.
                  </Typography>
                </CardBody>
                <div className="flex-grow">
                  <ImageUploader className="h-full w-full" img={img} setImg={setImg} />
                </div>
              </Card>
            </div>
          </div>
        </CardBody>
        <div className="mt-4 mb-8 flex justify-center">
          <Button color="blue" size="lg" onClick={handleSubmit}>
            작업시작
          </Button>
        </div>
      </Card>
    </>
  );
}

export default ConnectOptions;

