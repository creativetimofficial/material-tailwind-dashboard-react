import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Input, Tab, Tabs, TabsHeader } from '@material-tailwind/react'
import { useState } from 'react'

export type TabItem = {
    label: string,
    value: string
}

type FilterAndResearchProps = {
    tabsList: Array<TabItem>,
}

const FilterAndResearch = ({ tabsList }: FilterAndResearchProps) => {

    const [selectedTab, setSelectedTab] = useState<TabItem>(tabsList[0])
  
    return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value={selectedTab.value} className="w-auto">
            <TabsHeader className="bg-primary">
                {tabsList.map(({ label, value }, index) => (
                    <Tab onClick={() => setSelectedTab(tabsList[index])} className={`${selectedTab.value === value ? "text-primary" : `text-white`} w-max`} key={value} value={value}>
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                ))}
            </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
            <Input
                crossOrigin={null}
                label="Rechercher"
                className="peer focus:border-primary"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
        </div>
    </div>
  )
}

export default FilterAndResearch