const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.MONGO_URI) {
  console.log("MONGO_URI is empty. Start the app normally to use the seeded local database.");
  process.exit(0);
}

const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");

const today = new Date();
const isoDate = (offset) => {
  const date = new Date(today);
  date.setDate(today.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

const users = [
  ["Admin", "Manager", "admin@carebridge.test", "Admin123!", true, false, 36, "neither", 5550101, "CareBridge operations desk", "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80"],
  ["Maya", "Patient", "patient@carebridge.test", "Patient123!", false, false, 28, "female", 5550120, "12 Wellness Avenue", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80"],
  ["Omar", "Haddad", "omar.patient@carebridge.test", "Patient123!", false, false, 35, "male", 5550180, "48 Atlas Street", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80"],
  ["Youssef", "Bennani", "doctor@carebridge.test", "Doctor123!", false, true, 41, "male", 5550140, "Care Clinic, Casablanca", "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80"],
  ["Leila", "Mansouri", "leila.doctor@carebridge.test", "Doctor123!", false, true, 38, "female", 5550190, "Northside Care Center", "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=256&q=80"],
  ["Sara", "Applicant", "applicant@carebridge.test", "Apply123!", false, false, 33, "female", 5550160, "Specialist application record", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=256&q=80"],
  ["Nadia", "Rahmani", "nadia.applicant@carebridge.test", "Apply123!", false, false, 44, "female", 5550200, "Specialist application record", "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=256&q=80"],
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  await Promise.all([
    User.deleteMany({}),
    Doctor.deleteMany({}),
    Appointment.deleteMany({}),
    Notification.deleteMany({}),
  ]);

  const created = {};
  for (const [firstname, lastname, email, password, isAdmin, isDoctor, age, gender, mobile, address, pic] of users) {
    created[email] = await User.create({
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
      isAdmin,
      isDoctor,
      status: isDoctor || isAdmin ? "accepted" : "pending",
      age,
      gender,
      mobile,
      address,
      pic,
    });
  }

  await Doctor.create([
    { userId: created["doctor@carebridge.test"]._id, specialization: "Cardiology", experience: 12, fees: 45, availability: "Mon-Fri, 09:00-15:00", isDoctor: true },
    { userId: created["leila.doctor@carebridge.test"]._id, specialization: "Pediatrics", experience: 9, fees: 40, availability: "Mon-Thu, 10:00-17:00", isDoctor: true },
    { userId: created["applicant@carebridge.test"]._id, specialization: "Dermatology", experience: 6, fees: 35, availability: "Tue-Thu, 10:00-16:00", isDoctor: false },
    { userId: created["nadia.applicant@carebridge.test"]._id, specialization: "Neurology", experience: 14, fees: 60, availability: "Flexible after confirmation", isDoctor: false },
  ]);

  await Appointment.create([
    { userId: created["patient@carebridge.test"]._id, doctorId: created["doctor@carebridge.test"]._id, date: isoDate(0), time: "10:30", status: "Pending", reminder: true, doctorNote: "" },
    { userId: created["omar.patient@carebridge.test"]._id, doctorId: created["leila.doctor@carebridge.test"]._id, date: isoDate(1), time: "14:00", status: "Pending", reminder: false, doctorNote: "" },
    { userId: created["patient@carebridge.test"]._id, doctorId: created["leila.doctor@carebridge.test"]._id, date: isoDate(-2), time: "09:00", status: "Completed", reminder: true, doctorNote: "Patient recovered well. Continue hydration and return if symptoms change." },
    { userId: created["omar.patient@carebridge.test"]._id, doctorId: created["doctor@carebridge.test"]._id, date: isoDate(3), time: "16:30", status: "Pending", reminder: true, doctorNote: "" },
  ]);

  await Notification.create([
    { userId: created["patient@carebridge.test"]._id, content: "Your upcoming cardiology appointment is scheduled." },
    { userId: created["doctor@carebridge.test"]._id, content: "You have appointments waiting for review." },
    { userId: created["admin@carebridge.test"]._id, content: "Two doctor applications are ready for admin review." },
  ]);

  await mongoose.disconnect();
  console.log("CareBridge database seeded successfully.");
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
