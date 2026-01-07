import React from 'react';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

export const ProjectFilters = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onStatusChange,
  filterPriority,
  onPriorityChange,
  onSort,
  sortDirection,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <select
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button
            onClick={onSort}
            className="col-span-2 lg:col-span-1 inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ChevronUpDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            <span className="font-medium text-gray-700">
              Sort {sortDirection === 'asc' ? '↑' : '↓'}
            </span>
          </button>

          <div className="hidden lg:flex items-center justify-center gap-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white'
              }`}
            >
              <Squares2X2Icon className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white'
              }`}
            >
              <ListBulletIcon className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectFilters.displayName = 'ProjectFilters';
