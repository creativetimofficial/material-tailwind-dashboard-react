import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

export function Terms() {
  return (
    <div className="m-8 flex justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader
          color="blue-gray"
          className="text-center"
        >
          <Typography variant="h4" color="white">
            Terms and Conditions
          </Typography>
        </CardHeader>
        <CardBody className="p-6">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Introduction
          </Typography>
          <Typography variant="body1" color="blue-gray" className="mb-4">
            Welcome to our application. These terms and conditions outline the rules and regulations for the use of our service.
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Intellectual Property Rights
          </Typography>
          <Typography variant="body1" color="blue-gray" className="mb-4">
            Other than the content you own, under these Terms, we own all the intellectual property rights and materials contained in this application.
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Restrictions
          </Typography>
          <Typography variant="body1" color="blue-gray" className="mb-4">
            You are specifically restricted from all of the following:
            <ul className="list-disc list-inside">
              <li>Publishing any application material in any other media</li>
              <li>Selling, sublicensing and/or otherwise commercializing any application material</li>
              <li>Publicly performing and/or showing any application material</li>
              <li>Using this application in any way that is or may be damaging to this application</li>
              <li>Using this application in any way that impacts user access to this application</li>
              <li>Using this application contrary to applicable laws and regulations</li>
            </ul>
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Your Privacy
          </Typography>
          <Typography variant="body1" color="blue-gray" className="mb-4">
            Please read our Privacy Policy.
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Limitation of Liability
          </Typography>
          <Typography variant="body1" color="blue-gray" className="mb-4">
            In no event shall we, nor any of our officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this application.
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}

export default Terms;