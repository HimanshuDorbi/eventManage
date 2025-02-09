import React from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan: string) => {
    // TODO: Implement actual payment integration
    console.log(`Subscribing to ${plan} plan`);
    localStorage.setItem("subscriptionPlan", plan);
    navigate("/dashboard/create-event");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Select a plan to start creating and managing events
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg shadow-sm p-8 border-t-4 border-gray-400 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
            <div className="mb-6">
              <span className="text-4xl text-gray-600">$9.99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8 min-h-[160px]">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">
                  Create up to 5 events/month
                </span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Basic analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Email support</span>
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe("basic")}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Subscribe to Basic
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-lg shadow-sm p-8 border-t-4 border-indigo-500 hover:shadow-md transition-shadow transform scale-105">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm">
              Popular
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl text-gray-600 font-bold">$24.99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8 min-h-[160px]">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Unlimited events</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">Custom branding</span>
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe("pro")}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Subscribe to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
