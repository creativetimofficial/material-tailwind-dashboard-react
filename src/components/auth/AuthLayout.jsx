import React from 'react';
import { Typography } from '@material-tailwind/react';
import { ShieldCheckIcon, LockClosedIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

export const AuthLayout = React.memo(({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl mb-6 ring-4 ring-blue-500/20">
            <ShieldCheckIcon className="h-10 w-10 text-white" />
          </div>
          <Typography variant="h3" className="text-white font-bold mb-3 tracking-tight">
            {title || 'Enterprise Dashboard'}
          </Typography>
          {subtitle && (
            <Typography variant="paragraph" className="text-slate-300">
              {subtitle}
            </Typography>
          )}
        </div>

        {/* Content Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50">
          {children}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex items-center justify-center gap-8 text-slate-300">
          <div className="flex items-center gap-2">
            <LockClosedIcon className="h-5 w-5 text-blue-400" />
            <Typography variant="small" className="font-medium">
              Secure SSL
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <CheckBadgeIcon className="h-5 w-5 text-blue-400" />
            <Typography variant="small" className="font-medium">
              Verified
            </Typography>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Typography variant="small" className="text-slate-400">
            © 2026 Enterprise Dashboard. All rights reserved.
          </Typography>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a href="#" className="text-slate-400 hover:text-white text-xs transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-600">•</span>
            <a href="#" className="text-slate-400 hover:text-white text-xs transition-colors">
              Terms of Service
            </a>
            <span className="text-slate-600">•</span>
            <a href="#" className="text-slate-400 hover:text-white text-xs transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

AuthLayout.displayName = 'AuthLayout';
