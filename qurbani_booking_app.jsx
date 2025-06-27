// QurbaniBookingApp.jsx
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios';

const animals = ["Cow", "Goat", "Sheep"];
const days = ["Day 1", "Day 2", "Day 3"];
const timeSlots = ["1:00 PM", "4:00 PM", "7:00 PM"];
const totalSlots = {
  Cow: 4900, // 700 cows x 7 shares
  Goat: 700,
  Sheep: 700
};

const QurbaniBookingApp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    address: '',
    animal: 'Cow',
    day: 'Day 1',
    time: '1:00 PM'
  });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/book', form);
      setMessage("Booking successful! Confirmation sent to email.");
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.message || "Failed to book."));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src="/logo.png" alt="MWF Logo" className="w-40 mb-4" />
      <h1 className="text-2xl font-bold mb-6">MWF Qurbani Online Booking App</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" placeholder="Full Name" required onChange={handleChange} className="p-2 border rounded" />
        <input name="email" placeholder="Email" required type="email" onChange={handleChange} className="p-2 border rounded" />
        <input name="phone" placeholder="Phone" required onChange={handleChange} className="p-2 border rounded" />
        <input name="cnic" placeholder="CNIC" required onChange={handleChange} className="p-2 border rounded" />
        <input name="address" placeholder="Address" required onChange={handleChange} className="p-2 border rounded" />

        <select name="animal" onChange={handleChange} className="p-2 border rounded">
          {animals.map(a => <option key={a}>{a}</option>)}
        </select>

        <select name="day" onChange={handleChange} className="p-2 border rounded">
          {days.map(d => <option key={d}>{d}</option>)}
        </select>

        <select name="time" onChange={handleChange} className="p-2 border rounded">
          {timeSlots.map(t => <option key={t}>{t}</option>)}
        </select>

        <Button type="submit">Book My Qurbani</Button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default QurbaniBookingApp;
