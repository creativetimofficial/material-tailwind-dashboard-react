import { ModalContext } from '@/context/modalContext'
import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import { useContext } from 'react'

const DeleteConfirmationModal = () => {
    const {handleOpen} = useContext(ModalContext);

  return (
    <Card className="w-full">
        <Typography type="h2" className="uppercase text-2xl text-center mt-8 text-primary font-bold">
            Confirmer la suppression
        </Typography>
        <CardBody className="flex text-center flex-col gap-4">
        <Typography className='text-lg'>Êtes vous sur de vouloir supprimer cette resource ?</Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
        <Button variant="filled" className="bg-gray-400 uppercase font-bold" onClick={handleOpen}>
            <Typography className='font-semibold text-base'>
                Annuler
            </Typography>
        </Button>
        <Button variant="filled" className="bg-red-700 uppercase font-bold" onClick={handleOpen}>
            <Typography className='font-semibold text-base'>
            Valider
            </Typography>
        </Button>
        </CardFooter>
    </Card>
  )
}

export default DeleteConfirmationModal