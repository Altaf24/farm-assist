import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Users, ExternalLink, Video, Play, Filter } from "lucide-react";

const Webinars = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, upcoming, past, recorded

  useEffect(() => {
    // Simulating API fetch for webinars and events
    const fetchEvents = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`${BASE_URL}/api/events`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const today = new Date();
        const mockEvents = [
          {
            id: 1,
            title: "Advanced Irrigation Techniques for Water Conservation",
            description: "Join our expert panel to learn about cutting-edge irrigation methods that can reduce water usage by up to 40% while maintaining crop yields.",
            date: new Date(today.getFullYear(), today.getMonth() + 1, 15).toISOString(),
            time: "10:00 AM - 11:30 AM EST",
            speakers: ["Dr. Maria Rodriguez", "John Smith"],
            type: "webinar",
            isRecorded: false,
            registrationLink: "#",
            image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 2,
            title: "Sustainable Pest Management in Organic Farming",
            description: "Discover effective organic pest control strategies that protect your crops without harmful chemicals.",
            date: new Date(today.getFullYear(), today.getMonth() + 1, 22).toISOString(),
            time: "2:00 PM - 3:30 PM EST",
            speakers: ["Emily Chen, PhD", "Robert Johnson"],
            type: "webinar",
            isRecorded: false,
            registrationLink: "#",
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 3,
            title: "FarmAssist Annual Conference 2023",
            description: "Join us for our biggest event of the year featuring keynote speakers, workshops, and networking opportunities with agricultural experts from around the world.",
            date: new Date(today.getFullYear(), today.getMonth() + 2, 10).toISOString(),
            time: "9:00 AM - 5:00 PM EST (3 Days)",
            speakers: ["Multiple Industry Experts"],
            type: "conference",
            isRecorded: false,
            registrationLink: "#",
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 4,
            title: "Climate Change Adaptation Strategies for Farmers",
            description: "Learn practical approaches to adapt your farming practices to changing climate conditions and extreme weather events.",
            date: new Date(today.getFullYear(), today.getMonth() - 1, 18).toISOString(),
            time: "1:00 PM - 2:30 PM EST",
            speakers: ["Dr. James Wilson", "Sarah Thompson"],
            type: "webinar",
            isRecorded: true,
            recordingLink: "#",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 5,
            title: "AI and Machine Learning in Modern Agriculture",
            description: "Explore how artificial intelligence and machine learning are revolutionizing farming practices and increasing efficiency.",
            date: new Date(today.getFullYear(), today.getMonth() - 2, 5).toISOString(),
            time: "11:00 AM - 12:30 PM EST",
            speakers: ["Dr. Michael Lee"],
            type: "webinar",
            isRecorded: true,
            recordingLink: "#",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 6,
            title: "Soil Health Workshop: Building Fertility Naturally",
            description: "A hands-on virtual workshop on improving soil health through natural methods, cover cropping, and proper crop rotation.",
            date: new Date(today.getFullYear(), today.getMonth() - 1, 25).toISOString(),
            time: "10:00 AM - 12:00 PM EST",
            speakers: ["Lisa Brown", "David Garcia"],
            type: "workshop",
            isRecorded: true,
            recordingLink: "#",
            image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          }
        ];
        
        setEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    switch(filter) {
      case "upcoming":
        return eventDate > today && !event.isRecorded;
      case "past":
        return eventDate < today && !event.isRecorded;
      case "recorded":
        return event.isRecorded;
      default:
        return true;
    }
  });

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Webinars & Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our live webinars and events to learn from agricultural experts and connect with the farming community.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "upcoming"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "past"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Past Events
          </button>
          <button
            onClick={() => setFilter("recorded")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
              filter === "recorded"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            <Video className="h-4 w-4 mr-1" />
            Recorded Sessions
          </button>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No events found for the selected filter.</p>
                <button 
                  onClick={() => setFilter("all")}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  View All Events
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => {
                  const eventDate = new Date(event.date);
                  const isUpcoming = eventDate > new Date();
                  
                  return (
                    <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-0 right-0 m-3">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            event.isRecorded 
                              ? "bg-purple-100 text-purple-800"
                              : isUpcoming 
                                ? "bg-green-100 text-green-800" 
                                : "bg-gray-100 text-gray-800"
                          }`}>
                            {event.isRecorded ? "Recorded" : isUpcoming ? "Upcoming" : "Past"}
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 m-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full capitalize">
                            {event.type}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {event.description}
                        </p>
                        
                        <div className="space-y-2 mt-4">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <span className="text-sm text-gray-700">{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <span className="text-sm text-gray-700">{event.time}</span>
                          </div>
                          <div className="flex items-start">
                            <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <span className="text-sm text-gray-700">
                              {event.speakers.join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100 mt-4">
                        {event.isRecorded ? (
                          <a
                            href={event.recordingLink}
                            className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Watch Recording
                          </a>
                        ) : isUpcoming ? (
                          <a
                            href={event.registrationLink}
                            className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Register Now
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        ) : (
                          <div className="text-center text-gray-500 py-2">
                            This event has ended
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Subscribe to Updates */}
        <div className="mt-16 bg-green-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Never Miss an Event
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to receive notifications about upcoming webinars and events.
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
  
  export default Webinars;
  