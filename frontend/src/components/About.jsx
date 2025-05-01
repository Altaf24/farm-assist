import React from 'react';
import { FaSeedling, FaCloudSun, FaBug, FaChartLine } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaSeedling className="text-green-600 text-4xl" />,
      title: 'Crop Recommendations',
      description: 'Get tailored suggestions based on soil data and weather patterns to optimize your crop selection and planting schedule.'
    },
    {
      icon: <FaBug className="text-green-600 text-4xl" />,
      title: 'Pest Detection',
      description: 'Upload images of your crops to identify potential pest infestations early and receive treatment recommendations.'
    },
    {
      icon: <FaCloudSun className="text-green-600 text-4xl" />,
      title: 'Weather Alerts',
      description: 'Stay informed with real-time weather forecasts and alerts specific to your farm location to plan your activities accordingly.'
    },
    {
      icon: <FaChartLine className="text-green-600 text-4xl" />,
      title: 'Resource Management',
      description: 'Track and optimize your resource usage including water, fertilizers, and labor to maximize efficiency and reduce costs.'
    }
  ];

  const teamMembers = [
    {
      name: 'Udayan Tawre',
      role: 'Agricultural Expert',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAjNBzAUolb8d-TNA7aJD0tt9mNnbw8IXhrBKEqkqLgG5YgqrlpqCWK7w&s',
      bio: 'With over 5 years of farming experience, Udayan provides expert insights on sustainable agricultural practices.'
    },
    {
      name: 'Vinit Desai',
      role: 'AI Specialist',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAjNBzAUolb8d-TNA7aJD0tt9mNnbw8IXhrBKEqkqLgG5YgqrlpqCWK7w&s',
      bio: 'Vinit leads our AI development team, creating intelligent algorithms that power our crop recommendation system.'
    },
    {
      name: 'Siddhant Wasekar',
      role: 'Environmental Scientist',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAjNBzAUolb8d-TNA7aJD0tt9mNnbw8IXhrBKEqkqLgG5YgqrlpqCWK7w&s',
      bio: 'Michael ensures our recommendations are environmentally friendly and promote sustainable farming practices.'
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-center mb-6">About FarmAssist</h1>
        <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto">
          FarmAssist is an AI-driven platform aimed at assisting everyday farmers in optimizing their 
          agricultural practices, managing resources, and improving productivity.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-center mb-4 text-gray-700">
            Our mission is to empower farmers with accessible technology that simplifies decision-making 
            and enhances farm productivity while promoting sustainable agricultural practices.
          </p>
          <p className="text-lg text-center text-gray-700">
            We believe that by combining traditional farming knowledge with modern AI technology, 
            we can help farmers face the challenges of climate change, resource scarcity, and increasing 
            global food demand.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center h-full">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-10">Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              <div className="flex justify-center pt-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="rounded-full w-32 h-32 object-cover" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-500 mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
