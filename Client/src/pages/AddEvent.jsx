// AddEvent.jsx
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function AddEvent() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    optional: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: '',
    likes: 0
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    axios
      .post("/createEvent", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log("Event posted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error posting event:", error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Post an Event</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className="flex flex-col">
            <label className='block text-gray-700 text-sm font-bold mb-2'>Title:</label>
            <input
              type="text"
              name="title"
              className='w-full border border-gray-300 rounded-md p-2'
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className='block text-gray-700 text-sm font-bold mb-2'>Optional:</label>
            <input
              type="text"
              name="optional"
              className='w-full border border-gray-300 rounded-md p-2'
              value={formData.optional}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className='block text-gray-700 text-sm font-bold mb-2'>Description:</label>
            <textarea
              name="description"
              className='w-full border border-gray-300 rounded-md p-2'
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className='block text-gray-700 text-sm font-bold mb-2'>Organized By:</label>
            <input
              type="text"
              name="organizedBy"
              className='w-full border border-gray-300 rounded-md p-2'
              value={formData.organizedBy}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className='block text-gray-700 text-sm font-bold mb-2'>Event Date:</label>
            <input
              type="date"
              name="eventDate"
              className='w-full border border-gray-300 rounded-md p-2'
              value={formData.eventDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className='block text-gray-700 text-sm font-bold mb-2'>Event Time:</label>
            <input
              type="time"
              name="eventTime"
              className='w-full border border-gray-300 rounded-md p-2'
              value={formData.eventTime}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className='block text-gray-700 text-sm font-bold mb-2'>Location:</label>
            <input
              type="text"
              name="location"
              className='w-full border border-gray-300 rounded-md p-2'
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className='block text-gray-700 text-sm font-bold mb-2'>Ticket Price:</label>
            <input
              type="number"
              name="ticketPrice"
              className='w-full border border-gray-300 rounded-md p-2'
              value={formData.ticketPrice}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className='block text-gray-700 text-sm font-bold mb-2'>Image:</label>
            <input
              type="file"
              name="image"
              className='w-full border border-gray-300 rounded-md p-2'
              onChange={handleImageUpload}
            />
          </div>
          <button
            type="submit"
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}