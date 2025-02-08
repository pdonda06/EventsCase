// TicketPage.jsx
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function TicketPage() {
  const { user } = useContext(UserContext);

  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    axios.get(`/tickets/user/${user._id}`)
      .then(response => {
        setUserTickets(response.data);
      })
      .catch(error => {
        console.error('Error fetching user tickets:', error);
      });
  };

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(`/tickets/${ticketId}`);
      fetchTickets();
      alert('Ticket Deleted');
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-5 flex justify-between items-center">
          <div>
            <Link to="/">
              <button className="inline-flex items-center p-3 bg-gray-100 text-blue-700 font-bold rounded-md">
                <IoMdArrowBack className="w-6 h-6 mr-2" />
                Back
              </button>
            </Link>
          </div>
          <div className="hidden xl:block">
            <RiDeleteBinLine className="h-6 w-10 text-red-700" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {userTickets.map(ticket => (
            <div key={ticket._id} className="bg-white p-5 rounded-md shadow-md relative">
              <button
                onClick={() => deleteTicket(ticket._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <RiDeleteBinLine className="h-6 w-6" />
              </button>
              <div className="flex items-center">
                <div className="w-24 h-24">
                  <img
                    src={ticket.ticketDetails.qr}
                    alt="QRCode"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg font-bold">{ticket.ticketDetails.eventname.toUpperCase()}</div>
                  <div className="text-sm text-gray-600">{ticket.ticketDetails.eventdate.split("T")[0]}, {ticket.ticketDetails.eventtime}</div>
                  <div className="text-sm text-gray-600">Name: {ticket.ticketDetails.name.toUpperCase()}</div>
                  <div className="text-sm text-gray-600">Price: Rs. {ticket.ticketDetails.ticketprice}</div>
                  <div className="text-sm text-gray-600">Email: {ticket.ticketDetails.email}</div>
                  <div className="text-sm text-gray-600">Ticket ID: {ticket.ticketDetails._id}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}