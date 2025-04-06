import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Tag, ChevronRight } from "lucide-react";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    "Crop Management",
    "Sustainable Farming",
    "Technology",
    "Market Trends",
    "Pest Control",
    "Weather Insights"
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Simulating API fetch for blog articles
    const fetchArticles = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`${BASE_URL}/api/articles`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockArticles = [
          {
            id: 1,
            title: "Maximizing Crop Yield with AI-Driven Irrigation",
            excerpt: "Learn how artificial intelligence is revolutionizing irrigation systems for better crop yields and water conservation.",
            author: "Dr. Sarah Johnson",
            date: "2023-10-15",
            readTime: "8 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 2,
            title: "Organic Pest Control Methods for Sustainable Farming",
            excerpt: "Discover effective organic methods to control pests without harming the environment or compromising crop quality.",
            author: "Michael Chen",
            date: "2023-10-10",
            readTime: "6 min read",
            category: "Pest Control",
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 3,
            title: "Climate Change and Its Impact on Agricultural Practices",
            excerpt: "An in-depth analysis of how changing climate patterns are affecting farming and what adaptations are necessary.",
            author: "Emily Rodriguez",
            date: "2023-10-05",
            readTime: "10 min read",
            category: "Weather Insights",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 4,
            title: "The Future of Sustainable Farming: Trends to Watch",
            excerpt: "Explore emerging trends in sustainable agriculture that are shaping the future of farming worldwide.",
            author: "Dr. James Wilson",
            date: "2023-09-28",
            readTime: "7 min read",
            category: "Sustainable Farming",
            image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 5,
            title: "Understanding Global Agricultural Markets in 2023",
            excerpt: "A comprehensive overview of current agricultural market trends and predictions for the coming year.",
            author: "Sophia Martinez",
            date: "2023-09-20",
            readTime: "9 min read",
            category: "Market Trends",
            image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 6,
            title: "Crop Rotation Strategies for Soil Health",
            excerpt: "Learn effective crop rotation techniques to maintain soil fertility and prevent pest buildup.",
            author: "Robert Johnson",
            date: "2023-09-15",
            readTime: "5 min read",
            category: "Crop Management",
            image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
        ];
        
        setArticles(mockArticles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">FarmAssist Blog & Articles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, tips, and trends in agriculture and farming technology.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "All"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center text-xs text-gray-500 ml-3">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                        {article.author.charAt(0)}
                      </div>
                      <span className="ml-2 text-sm text-gray-700">{article.author}</span>
                    </div>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <Link
                    to={`/resources/blog/${article.id}`}
                    className="mt-4 inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                  >
                    Read more
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-green-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Get the latest farming insights and tips delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
