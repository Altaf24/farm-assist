import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, HelpCircle, Tractor, ArrowRight, Calendar, Clock, Shield } from 'lucide-react';

const TractorPricing = () => {
  const [pricingPeriod, setPricingPeriod] = useState('hourly');
  const [tractorType, setTractorType] = useState('all');

  // Pricing data for different tractor types and rental periods
  const pricingData = {
    light: {
      hourly: {
        baseRate: 300,
        minHours: 2,
        deposit: 2000,
        serviceFee: 50,
        insuranceFee: 100
      },
      daily: {
        baseRate: 2000,
        deposit: 5000,
        serviceFee: 300,
        insuranceFee: 500
      },
      weekly: {
        baseRate: 12000,
        deposit: 10000,
        serviceFee: 1500,
        insuranceFee: 2500
      }
    },
    medium: {
      hourly: {
        baseRate: 450,
        minHours: 2,
        deposit: 3000,
        serviceFee: 75,
        insuranceFee: 150
      },
      daily: {
        baseRate: 3000,
        deposit: 7000,
        serviceFee: 450,
        insuranceFee: 750
      },
      weekly: {
        baseRate: 18000,
        deposit: 15000,
        serviceFee: 2250,
        insuranceFee: 3750
      }
    },
    heavy: {
      hourly: {
        baseRate: 600,
        minHours: 3,
        deposit: 5000,
        serviceFee: 100,
        insuranceFee: 200
      },
      daily: {
        baseRate: 4500,
        deposit: 10000,
        serviceFee: 600,
        insuranceFee: 1000
      },
      weekly: {
        baseRate: 25000,
        deposit: 20000,
        serviceFee: 3000,
        insuranceFee: 5000
      }
    }
  };

  // Features included in each plan
  const includedFeatures = [
    'Verified tractor owners',
    'Secure online payments',
    'Customer support',
    'Booking management',
    'Cancellation options',
    'Basic insurance coverage'
  ];

  // Premium features
  const premiumFeatures = [
    'Priority customer support',
    'Enhanced insurance coverage',
    'Free cancellation',
    'Flexible booking changes',
    'Discounted rates for regular users',
    'Access to premium tractors'
  ];

  // Calculate example prices based on selected options
  const getExamplePrices = () => {
    if (tractorType === 'all') {
      return {
        light: pricingData.light[pricingPeriod].baseRate,
        medium: pricingData.medium[pricingPeriod].baseRate,
        heavy: pricingData.heavy[pricingPeriod].baseRate
      };
    } else {
      return {
        [tractorType]: pricingData[tractorType][pricingPeriod].baseRate
      };
    }
  };

  const examplePrices = getExamplePrices();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Tractor Rental Pricing</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Transparent and affordable pricing for all your farming needs
          </p>
        </div>

        {/* Pricing Options */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Customize Pricing View</h2>
              <p className="mt-1 text-sm text-gray-500">
                Select options to see pricing relevant to your needs
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 sm:flex sm:space-x-4">
              <div>
                <label htmlFor="pricingPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                  Rental Period
                </label>
                <select
                  id="pricingPeriod"
                  name="pricingPeriod"
                  value={pricingPeriod}
                  onChange={(e) => setPricingPeriod(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="tractorType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tractor Type
                </label>
                <select
                  id="tractorType"
                  name="tractorType"
                  value={tractorType}
                  onChange={(e) => setTractorType(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="light">Light Duty</option>
                  <option value="medium">Medium Duty</option>
                  <option value="heavy">Heavy Duty</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Light Duty Card */}
          {(tractorType === 'all' || tractorType === 'light') && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-md bg-green-100 flex items-center justify-center">
                    <Tractor className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Light Duty Tractors</h3>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Ideal for small farms and light tasks. Typically 20-40 HP.
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-4xl font-extrabold text-gray-900">₹{examplePrices.light}</p>
                  <p className="text-base text-gray-500">
                    per {pricingPeriod === 'hourly' ? 'hour' : pricingPeriod === 'daily' ? 'day' : 'week'}
                  </p>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        {pricingPeriod === 'hourly' ? `Minimum ${pricingData.light.hourly.minHours} hours rental` : 'No minimum hours'}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Refundable deposit: ₹{pricingData.light[pricingPeriod].deposit}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Service fee: ₹{pricingData.light[pricingPeriod].serviceFee}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Basic implements included
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    to="/tractor/book-now?type=light"
                    className="block w-full bg-green-50 border border-green-500 rounded-md py-3 text-sm font-medium text-green-700 text-center hover:bg-green-100"
                  >
                    Browse Light Duty Tractors
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Medium Duty Card */}
          {(tractorType === 'all' || tractorType === 'medium') && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-green-500">
              <div className="bg-green-500 px-6 py-2">
                <p className="text-xs font-medium text-white uppercase tracking-wide text-center">
                  Most Popular
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-md bg-green-100 flex items-center justify-center">
                    <Tractor className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Medium Duty Tractors</h3>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Perfect for most farming operations. Typically 40-75 HP.
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-4xl font-extrabold text-gray-900">₹{examplePrices.medium}</p>
                  <p className="text-base text-gray-500">
                    per {pricingPeriod === 'hourly' ? 'hour' : pricingPeriod === 'daily' ? 'day' : 'week'}
                  </p>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        {pricingPeriod === 'hourly' ? `Minimum ${pricingData.medium.hourly.minHours} hours rental` : 'No minimum hours'}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Refundable deposit: ₹{pricingData.medium[pricingPeriod].deposit}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Service fee: ₹{pricingData.medium[pricingPeriod].serviceFee}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Standard implements included
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Operator assistance available
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    to="/tractor/book-now?type=medium"
                    className="block w-full bg-green-600 border border-transparent rounded-md py-3 text-sm font-medium text-white text-center hover:bg-green-700"
                  >
                    Browse Medium Duty Tractors
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Heavy Duty Card */}
          {(tractorType === 'all' || tractorType === 'heavy') && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                <div className="h-12 w-12 rounded-md bg-green-100 flex items-center justify-center">
                    <Tractor className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900">Heavy Duty Tractors</h3>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    For large farms and heavy-duty tasks. Typically 75+ HP.
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-4xl font-extrabold text-gray-900">₹{examplePrices.heavy}</p>
                  <p className="text-base text-gray-500">
                    per {pricingPeriod === 'hourly' ? 'hour' : pricingPeriod === 'daily' ? 'day' : 'week'}
                  </p>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        {pricingPeriod === 'hourly' ? `Minimum ${pricingData.heavy.hourly.minHours} hours rental` : 'No minimum hours'}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Refundable deposit: ₹{pricingData.heavy[pricingPeriod].deposit}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Service fee: ₹{pricingData.heavy[pricingPeriod].serviceFee}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Premium implements included
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Experienced operator included
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        Priority support
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    to="/tractor/book-now?type=heavy"
                    className="block w-full bg-green-50 border border-green-500 rounded-md py-3 text-sm font-medium text-green-700 text-center hover:bg-green-100"
                  >
                    Browse Heavy Duty Tractors
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Included Features */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">What's Included</h3>
              <div className="mt-6">
                <ul className="space-y-4">
                  {includedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Premium Features */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Premium Features</h3>
              <p className="mt-2 text-sm text-gray-500">
                Available with premium membership or for an additional fee
              </p>
              <div className="mt-6">
                <ul className="space-y-4">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <HelpCircle className="h-4 w-4 text-green-500 mr-2" />
                    How is the deposit handled?
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">
                    The deposit is fully refundable and will be returned within 3-5 business days after the rental period ends, assuming no damage to the tractor.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <HelpCircle className="h-4 w-4 text-green-500 mr-2" />
                    What if I need to cancel my booking?
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">
                    Cancellations made 24 hours before the rental period receive a full refund. Later cancellations may incur a fee.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    <HelpCircle className="h-4 w-4 text-green-500 mr-2" />
                    Do I need to refuel the tractor?
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">
                    Yes, tractors should be returned with the same fuel level as when received. Additional charges may apply otherwise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-green-700 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:flex lg:items-center lg:py-16">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to rent or register your tractor?
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-green-100">
                Join thousands of farmers who are already saving money and increasing productivity with FarmAssist's tractor rental platform.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row space-y-4 sm:space-y-0 sm:space-x-4 lg:space-y-4 lg:space-x-0 xl:space-y-0 xl:space-x-4">
              <Link
                to="/tractor/book-now"
                className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Rent a Tractor
              </Link>
              <Link
                to="/tractor/register-tractor"
                className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50"
              >
                <Tractor className="mr-2 h-5 w-5" />
                Register Your Tractor
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Choose FarmAssist for Tractor Rentals?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 mx-auto">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Flexible Rental Periods</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Rent by the hour, day, or week based on your specific needs and project timeline.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 mx-auto">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Insurance Coverage</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                All rentals include basic insurance coverage for peace of mind during operation.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 mx-auto">
                <ArrowRight className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">Easy Booking Process</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Simple online booking system with real-time availability and instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TractorPricing;

                  
