export const BreakdownCard = ({ title, data, colors }) => {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <span className="text-sm font-semibold text-gray-500">Cəmi: {total}</span>
      </div>
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => {
          const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${colors[key] || 'bg-gray-400'}`}></div>
                  <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{value}</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${
                    colors[key] || 'bg-gray-400'
                  } rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
