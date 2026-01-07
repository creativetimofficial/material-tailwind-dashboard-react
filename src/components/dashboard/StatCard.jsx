import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

// Modern StatCard Component
export const StatCard = ({ title, value, change, trend, icon: Icon, color, description }) => {
  const colorClasses = {
    green: 'from-emerald-500 to-teal-600',
    blue: 'from-blue-500 to-cyan-600',
    purple: 'from-purple-500 to-pink-600',
    orange: 'from-orange-500 to-amber-600',
    indigo: 'from-indigo-500 to-blue-600',
    red: 'from-red-500 to-rose-600',
  };

  const iconBgColors = {
    green: 'bg-emerald-50',
    blue: 'bg-blue-50',
    purple: 'bg-purple-50',
    orange: 'bg-orange-50',
    indigo: 'bg-indigo-50',
    red: 'bg-red-50',
  };

  const iconColors = {
    green: 'text-emerald-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    indigo: 'text-indigo-600',
    red: 'text-red-600',
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden">
      {/* Gradient Background on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      ></div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`${iconBgColors[color]} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`h-6 w-6 ${iconColors[color]}`} />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {trend === 'up' ? (
                <ArrowTrendingUpIcon className="h-3.5 w-3.5" />
              ) : (
                <ArrowTrendingDownIcon className="h-3.5 w-3.5" />
              )}
              {change}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
            {value}
          </p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};
