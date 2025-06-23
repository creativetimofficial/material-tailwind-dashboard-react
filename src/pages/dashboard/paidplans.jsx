import React from "react";

export function PaidPlans() {
 
  const plans = [
    {
      name: 'Basic Plan',
      price: '$10/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      name: 'Standard Plan',
      price: '$20/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
      name: 'Premium Plan',
      price: '$30/month',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    },
  ];
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Paid Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-lg text-green-600">{plan.price}</p>
            <ul className="mt-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-gray-700">
                  - {feature}
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaidPlans;