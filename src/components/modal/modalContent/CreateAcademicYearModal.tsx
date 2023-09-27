import { ModalContext } from '@/context/modalContext'
import { Button, Textarea, Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react'
import { useContext } from 'react'

const CreateAcademicYearModal = () => {
    const {handleOpen} = useContext(ModalContext);

  return (
    <Card className="w-full">
        <Typography type="h2" className="uppercase text-2xl text-center mt-8 text-primary font-bold">
            Ajouter une année academique
        </Typography>
        <CardBody className="flex flex-col gap-4">
        <Input crossOrigin={null} label="Name" size="lg" />
        <Textarea label="Description" />
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
        <Button variant="filled" className="bg-gray-400 uppercase" onClick={handleOpen}>
            Annuler
        </Button>
        <Button variant="filled" className="bg-primary uppercase" onClick={handleOpen}>
            Ajouter
        </Button>
        </CardFooter>
    </Card>
  )
}

export default CreateAcademicYearModal