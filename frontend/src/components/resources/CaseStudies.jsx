import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Filter, ChevronDown } from "lucide-react";

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    region: "All",
    category: "All",
  });
  const [showFilters, setShowFilters] = useState(false);

  const regions = ["All", "North America", "Europe", "Asia", "Africa", "South America", "Australia"];
  const categories = ["All", "Crop Yield", "Water Conservation", "Sustainable Practices", "Technology Implementation", "Pest Management"];

  useEffect(() => {
    // Simulating API fetch for case studies
    const fetchCaseStudies = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`${BASE_URL}/api/case-studies`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockCaseStudies = [
          {
            id: 1,
            title: "50% Increase in Rice Yield with Smart Irrigation",
            excerpt: "How a farming cooperative in Thailand implemented smart irrigation systems to dramatically increase rice production while reducing water usage.",
            region: "Asia",
            category: "Water Conservation",
            date: "2023-09-15",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            results: ["50% increase in yield", "30% reduction in water usage", "ROI within 18 months"]
          },
          {
            id: 2,
            title: "Organic Pest Control Implementation in California Vineyards",
            excerpt: "A case study of how vineyard owners in Napa Valley transitioned to organic pest control methods and improved wine quality.",
            region: "North America",
            category: "Pest Management",
            date: "2023-08-22",
            image: "https://images.unsplash.com/photo-1559944554-e9a23340fefb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            results: ["Eliminated chemical pesticides", "Improved wine quality ratings by 15%", "Enhanced biodiversity"]
          },
          {
            id: 3,
            title: "Precision Agriculture Transformation in German Wheat Farms",
            excerpt: "How a network of wheat farms in Germany adopted precision agriculture technology to optimize fertilizer use and increase profitability.",
            region: "Europe",
            category: "Technology Implementation",
            date: "2023-07-10",
            image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            results: ["22% reduction in fertilizer costs", "18% increase in wheat yield", "Reduced environmental impact"]
          },
          {
            id: 4,
            title: "Regenerative Farming Practices in Australian Cattle Ranches",
            excerpt: "A multi-year study of regenerative grazing practices implemented across cattle ranches in Queensland, Australia.",
            region: "Australia",
            category: "Sustainable Practices",
            date: "2023-06-05",
            image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            results: ["Soil carbon increased by 40%", "Improved drought resilience", "Higher quality beef production"]
          },
          {
            id: 5,
            title: "AI-Driven Crop Disease Detection in Kenyan Coffee Farms",
            excerpt: "Implementation of mobile AI technology to detect and prevent coffee leaf rust disease across smallholder farms in Kenya.",
            region: "Africa",
            category: "Technology Implementation",
            date: "2023-05-18",
            image: "https://images.unsplash.com/photo-1497935586047-9395971fc3a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            results: ["Early disease detection improved by 85%", "Reduced crop losses by 60%", "Increased farmer income by 25%"]
          },
          {
            id: 6,
            title: "Vertical Farming Success in Urban Brazil",
            excerpt: "How a startup in São Paulo implemented vertical farming technology to supply fresh produce to urban communities.",
            region: "South America",
            category: "Crop Yield",
            date: "2023-04-12",
            image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            results: ["90% less water usage than traditional farming", "Year-round production regardless of climate", "Zero pesticide use"]
          }
        ];
        
        setCaseStudies(mockCaseStudies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching case studies:", error);
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value
    });
  };

  const filteredCaseStudies = caseStudies.filter(study => {
    return (filters.region === "All" || study.region === filters.region) &&
           (filters.category === "All" || study.category === filters.category);
  });

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore real-world examples of how FarmAssist has helped farmers around the world improve their agricultural practices and outcomes.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-700 font-medium mb-4 sm:hidden"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            <ChevronDown className={`h-5 w-5 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block bg-gray-50 p-4 rounded-lg mb-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select 
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Case Studies List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {filteredCaseStudies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No case studies match your current filters.</p>
                <button 
                  onClick={() => setFilters({ region: "All", category: "All" })}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredCaseStudies.map((study) => (
                  <div key={study.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    <div className="h-56 overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                          {study.region}
                        </span>
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                          {study.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {study.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {study.excerpt}
                      </p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Results:</h4>
                        <ul className="space-y-1">
                          {study.results.map((result, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center mr-2 mt-0.5">✓</span>
                              <span className="text-sm text-gray-700">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2 flex justify-between items-center border-t border-gray-100 mt-4">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(study.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <Link
                        to={`/resources/case-studies/${study.id}`}
                        className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                      >
                        Read full case study
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Contact CTA */}
        <div className="mt-16 bg-green-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Want to become our next success story?
            </h2>
            <p className="text-gray-600 mb-6">
              Contact our team to learn how FarmAssist can help optimize your agricultural operations.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
