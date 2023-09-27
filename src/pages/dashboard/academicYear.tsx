import FilterAndResearch from "@/components/filterAndResearch/FilterAndResearch";
import { DefaultPagination } from "@/components/pagination/DefaultPagination";
import { ModalContext } from "@/context/modalContext";
import { AcademicYear as AcademicYearEntity } from "@/entities/academicYear.entity";

import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useContext, useState } from "react";

type TabItem = {
  label: string,
  value: string
}

const TABS: TabItem[] = [
  {
    label: "Tous",
    value: "tous",
  },
  {
    label: "Plus récents",
    value: "récents",
  },
  {
    label: "Plus Anciens",
    value: "anciens",
  },
];

const academicYears: Array<AcademicYearEntity> = [
  new AcademicYearEntity({ date: "2023-2024" }),
  new AcademicYearEntity({ date: "2024-2025" }),
  new AcademicYearEntity({ date: "2025-2026" }),
  new AcademicYearEntity({ date: "2026-2027" }),
];

function AcademicYear() {

  const {handleOpen, dispatch} = useContext(ModalContext)

  const [selectedTab, setSelectedTab] = useState<TabItem>(TABS[0])

  const handleOpenCreateAcademicYearModal = () => {
    if(!dispatch) return
    
    dispatch!({ type: "ADD_ACADEMIC_YEAR" })
    handleOpen();
  }

  const handleOpenDeleteModal = () => {
    if(!dispatch) return
    
    dispatch!({ type: "DELETE_CONFIRMATION" })
    handleOpen();
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 600px:flex md:flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Liste d'années académiques
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Ci-dessous les informations sur les années académiques
            </Typography>
          </div>
          <Button onClick={handleOpenCreateAcademicYearModal} className="flex mt-4 600px:mt-0 items-center gap-3 bg-primary" size="md">
            <PlusCircleIcon strokeWidth={2} className="h-6 w-6" /> Ajouter une
            année académique
          </Button>
        </div>
        <FilterAndResearch tabsList={TABS} />
      </CardHeader>
      <CardBody className={`grid 600px:grid-cols-2 843px:grid-cols-3 1087px:grid-cols-4 1140px:grid-cols-3 1359px:grid-cols-4 gap-0 sm:gap-x-4 overflow-auto`}>
        {academicYears.map(({ date }, index) => {

          return (
            <Card key={index} className="mt-6 bg-primary">
              <CardBody className="flex items-center justify-between">
                <Typography variant="h5" className="text-white">
                  {date}
                </Typography>
                <div>
                  <Tooltip content="Edit Faculty">
                    <IconButton color="white" variant="text">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip content="Delete Faculty">
                    <IconButton onClick={handleOpenDeleteModal} color="white" variant="text">
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </CardBody>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        <DefaultPagination />
      </CardFooter>
    </Card>
  );
}

const styles = {
  "&:hover": {
    background: "#efefef"
  },
}

export default AcademicYear;
