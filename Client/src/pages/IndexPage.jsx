import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import heroImage from "../assets/hero.jpg";

export default function IndexPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/createEvent")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, likes: event.likes + 1 } : event
          )
        );
      })
      .catch((error) => {
        console.error("Error liking event:", error);
      });
  };

  return (
    <div className="mt-4 px-6 flex flex-col items-center">
      <img src={heroImage} alt="Event Hero" className="w-50 h-80 object-cover rounded-md my-7" />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {events.length > 0 &&
          events.map((event) => {
            const eventDate = new Date(event.eventDate);
            const currentDate = new Date();

            if (eventDate >= currentDate) {
              return (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden p-4 border border-gray-200"
                >
                  <div className="mt-3">
                    <h1 className="font-bold text-lg text-gray-800">
                      {event.title.toUpperCase()}
                    </h1>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {event.description}
                    </p>
                    <div className="text-sm text-gray-500 mt-2">
                      <span>{event.eventDate.split("T")[0]} | {event.eventTime}</span>
                      <span className="ml-4">
                        {event.ticketPrice === 0 ? "Free" : `Rs. ${event.ticketPrice}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => handleLike(event._id)}
                      className="flex items-center gap-1 text-gray-700 hover:text-primary transition"
                    >
                      <BiLike className="w-6 h-6" /> {event.likes}
                    </button>
                    <Link to={`/event/${event._id}`}>
                      <button className="flex items-center bg-primary text-white px-3 py-1 rounded-md shadow-md hover:bg-primarydark transition">
                        Book Ticket <BsArrowRightShort className="w-5 h-5 ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
