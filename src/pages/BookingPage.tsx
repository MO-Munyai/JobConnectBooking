import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Booking {
  id: string;
  start_time: string;
  description: string;
}

const BookingPage: React.FC = () => {
  const [startTime, setStartTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get<Booking[]>('/api/bookings/my');
      setBookings(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load your bookings.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/bookings', {
        start_time: startTime,
        description: description,
      });

      setSuccess('Booking created successfully!');
      setStartTime('');
      setDescription('');
      fetchBookings();
    } catch (err) {
      console.error(err);
      setError('Failed to create booking.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      await axios.delete(`/api/bookings/${id}`);
      setSuccess('Booking deleted successfully.');
      fetchBookings();
    } catch (err) {
      console.error(err);
      setError('Failed to delete booking.');
    }
  };

  return (
    <div className="container">
      <h1>Book a Service</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Create Booking'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <hr />

      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{new Date(booking.start_time).toLocaleString()}</strong> – {booking.description}
              <button
                onClick={() => handleDelete(booking.id)}
                style={{ marginLeft: '1rem', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingPage;
