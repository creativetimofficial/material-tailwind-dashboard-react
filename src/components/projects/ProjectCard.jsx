import React from 'react';
import {
  EllipsisVerticalIcon,
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, PauseCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export const ProjectCard = ({ project, onEdit, onDelete, onView }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const statusConfig = {
    active: {
      icon: CheckCircleIcon,
      className: 'bg-green-100 text-green-700',
      label: 'Active',
    },
    paused: {
      icon: PauseCircleIcon,
      className: 'bg-yellow-100 text-yellow-700',
      label: 'Paused',
    },
    completed: {
      icon: CheckCircleIcon,
      className: 'bg-blue-100 text-blue-700',
      label: 'Completed',
    },
    cancelled: {
      icon: XCircleIcon,
      className: 'bg-gray-100 text-gray-700',
      label: 'Cancelled',
    },
  };

  const priorityConfig = {
    critical: { color: 'bg-purple-500', label: 'Critical' },
    high: { color: 'bg-red-500', label: 'High' },
    medium: { color: 'bg-orange-500', label: 'Medium' },
    low: { color: 'bg-green-500', label: 'Low' },
  };

  const status = statusConfig[project.status] || statusConfig.active;
  const priority = priorityConfig[project.priority] || priorityConfig.medium;
  const StatusIcon = status.icon;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 relative">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className={`h-1.5 w-1.5 rounded-full ${priority.color}`}></div>
            <span className="text-xs font-semibold text-gray-500 uppercase">{priority.label}</span>
          </div>
          <h3
            className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer truncate"
            onClick={() => onView(project)}
          >
            {project.name}
          </h3>
        </div>

        {/* Actions Dropdown */}
        <div className="relative flex-shrink-0 ml-2">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <EllipsisVerticalIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-1 w-36 sm:w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                <button
                  onClick={() => {
                    onView(project);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-50 rounded-t-xl"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    onEdit(project);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(project.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Progress Bar */}
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">Progress</span>
          <span className="text-xs font-bold text-gray-900">{project.completion}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${project.completion}%` }}
          ></div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-600 truncate">
            {new Date(project.deadline).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <UserGroupIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-600">{project.team?.length || 0} members</span>
        </div>
      </div>

      {/* Budget */}
      {project.budget && (
        <div className="pt-3 border-t border-gray-100 mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <CurrencyDollarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-gray-900">
              ${(project.budget / 1000).toFixed(0)}K
            </span>
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div>
        <div
          className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${status.className} text-xs font-semibold`}
        >
          <StatusIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          {status.label}
        </div>
      </div>
    </div>
  );
};

ProjectCard.displayName = 'ProjectCard';
