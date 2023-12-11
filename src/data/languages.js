import { 
  authorsTableData as enAuthorsTableData, 
  conversationsData as enConversationsData, 
  layoutData as enLayoutData, 
  ordersOverviewData as enOrdersOverviewData, 
  platformSettingsData as enPlatformSettingsData, 
  projectsData as enProjectsData,
  projectsTableData as enProjectsTableData, 
  statisticsCardsData as enStatisticsCardsData, 
  statisticsChartsData as enStatisticsChartsData 
} from "./english";

import { 
  authorsTableData as faAuthorsTableData, 
  conversationsData as faConversationsData, 
  layoutData as faLayoutData, 
  ordersOverviewData as faOrdersOverviewData, 
  platformSettingsData as faPlatformSettingsData, 
  projectsData as faProjectsData,
  projectsTableData as faProjectsTableData, 
  statisticsCardsData as faStatisticsCardsData, 
  statisticsChartsData as faStatisticsChartsData 
} from "./persian";

const languages = {
  "eng": {
    authorsTableData: enAuthorsTableData,
    conversationsData: enConversationsData,
    layoutData: enLayoutData,
    ordersOverviewData: enOrdersOverviewData,
    platformSettingsData: enPlatformSettingsData,
    projectsData: enProjectsData,
    projectsTableData: enProjectsTableData,
    statisticsCardsData: enStatisticsCardsData,
    statisticsChartsData: enStatisticsChartsData
  },
  "fa": {
    authorsTableData: faAuthorsTableData,
    conversationsData: faConversationsData,
    layoutData: faLayoutData,
    ordersOverviewData: faOrdersOverviewData,
    platformSettingsData: faPlatformSettingsData,
    projectsData: faProjectsData,
    projectsTableData: faProjectsTableData,
    statisticsCardsData: faStatisticsCardsData,
    statisticsChartsData: faStatisticsChartsData
  }
}

export default languages;