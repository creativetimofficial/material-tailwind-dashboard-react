import React from 'react';
import { Card } from '../ui';
import { Typography } from '@material-tailwind/react';
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

export const ProfileStats = React.memo(({ stats }) => {
  const defaultStats = {
    projectsCompleted: 24,
    tasksCompleted: 156,
    hoursWorked: 1840,
    rating: 4.8,
    streak: 15,
    achievements: 12,
  };

  const displayStats = { ...defaultStats, ...stats };

  const statItems = [
    {
      icon: ChartBarIcon,
      label: 'Projects Completed',
      value: displayStats.projectsCompleted,
      color: 'blue',
      description: '+3 this month',
    },
    {
      icon: CheckCircleIcon,
      label: 'Tasks Completed',
      value: displayStats.tasksCompleted,
      color: 'green',
      description: '89% completion rate',
    },
    {
      icon: ClockIcon,
      label: 'Hours Worked',
      value: displayStats.hoursWorked,
      color: 'orange',
      description: `${Math.round(displayStats.hoursWorked / 160)} months`,
    },
    {
      icon: StarIcon,
      label: 'Average Rating',
      value: displayStats.rating.toFixed(1),
      color: 'yellow',
      description: 'Based on 24 reviews',
    },
    {
      icon: FireIcon,
      label: 'Current Streak',
      value: `${displayStats.streak} days`,
      color: 'red',
      description: 'Keep it up!',
    },
    {
      icon: TrophyIcon,
      label: 'Achievements',
      value: displayStats.achievements,
      color: 'purple',
      description: '75% unlocked',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statItems.map((item, idx) => (
          <StatItem key={idx} {...item} />
        ))}
      </div>

      {/* Skills Progress */}
      <Card>
        <div className="p-6">
          <Typography variant="h6" className="font-bold mb-4">
            Skills & Proficiency
          </Typography>
          <div className="space-y-4">
            <SkillBar label="React & Frontend" value={90} color="blue" />
            <SkillBar label="Node.js & Backend" value={85} color="green" />
            <SkillBar label="UI/UX Design" value={75} color="purple" />
            <SkillBar label="Project Management" value={80} color="orange" />
            <SkillBar label="Team Leadership" value={70} color="red" />
          </div>
        </div>
      </Card>

      {/* Activity Summary */}
      <Card>
        <div className="p-6">
          <Typography variant="h6" className="font-bold mb-4">
            Activity Summary
          </Typography>
          <div className="space-y-3">
            <ActivityItem label="Last Active" value="2 hours ago" icon="🟢" />
            <ActivityItem label="Last Project" value="E-commerce Platform" icon="📁" />
            <ActivityItem label="Current Tasks" value="8 in progress" icon="📋" />
            <ActivityItem label="Team Size" value="12 members" icon="👥" />
          </div>
        </div>
      </Card>
    </div>
  );
});

ProfileStats.displayName = 'ProfileStats';

// Stat Item Component
const StatItem = ({ icon: Icon, label, value, color, description }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <Typography variant="small" className="text-gray-600 mb-1">
          {label}
        </Typography>
        <Typography variant="h4" className="font-bold text-gray-900 mb-1">
          {value}
        </Typography>
        {description && (
          <Typography variant="small" className="text-gray-500 text-xs">
            {description}
          </Typography>
        )}
      </div>
    </Card>
  );
};

// Skill Bar Component
const SkillBar = ({ label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Typography variant="small" className="font-medium text-gray-700">
          {label}
        </Typography>
        <Typography variant="small" className="font-semibold text-gray-900">
          {value}%
        </Typography>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

// Activity Item Component
const ActivityItem = ({ label, value, icon }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <Typography variant="small" className="text-gray-700">
        {label}
      </Typography>
    </div>
    <Typography variant="small" className="font-semibold text-gray-900">
      {value}
    </Typography>
  </div>
);
