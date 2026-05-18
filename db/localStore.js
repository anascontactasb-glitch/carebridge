const bcrypt = require("bcryptjs");

const now = () => new Date().toISOString();
let idCounter = 1;

const store = {
  users: [],
  doctors: [],
  appointments: [],
  notifications: [],
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const nextId = () => `${Date.now().toString(36)}${(idCounter++).toString(36)}`;

const compareValue = (actual, expected) => {
  if (expected && typeof expected === "object" && "$ne" in expected) {
    return String(actual) !== String(expected.$ne);
  }
  return String(actual) === String(expected);
};

const matches = (record, criteria = {}) => {
  if (!criteria || Object.keys(criteria).length === 0) return true;

  if (criteria.$or) {
    return criteria.$or.some((option) => matches(record, option));
  }

  return Object.entries(criteria).every(([key, expected]) =>
    compareValue(record[key], expected)
  );
};

const withoutPassword = (record) => {
  const output = clone(record);
  delete output.password;
  return output;
};

class Query {
  constructor(collection, records) {
    this.collection = collection;
    this.records = records;
    this.hidePassword = false;
    this.populateFields = [];
  }

  find(criteria = {}) {
    this.records = this.records.filter((record) => matches(record, criteria));
    return this;
  }

  select(value) {
    if (value === "-password") this.hidePassword = true;
    return this;
  }

  populate(field) {
    this.populateFields.push(field);
    return this;
  }

  exec() {
    let records = this.records.map((record) => clone(record));

    for (const field of this.populateFields) {
      records = records.map((record) => {
        const user = store.users.find((item) => item._id === record[field]);
        return user ? { ...record, [field]: withoutPassword(user) } : record;
      });
    }

    if (this.hidePassword) {
      records = records.map((record) => withoutPassword(record));
    }

    return Promise.resolve(records);
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }
}

const createDocument = (collection, data) => ({
  ...data,
  _id: data._id || nextId(),
  createdAt: data.createdAt || now(),
  updatedAt: data.updatedAt || now(),
  async save() {
    const document = { ...this };
    delete document.save;
    store[collection].push(document);
    return clone(document);
  },
});

const createModel = (collection) => {
  const Model = (data) => createDocument(collection, data);

  Model.find = (criteria = {}) =>
    new Query(
      collection,
      store[collection].filter((record) => matches(record, criteria))
    );

  Model.findOne = async (criteria = {}) =>
    clone(store[collection].find((record) => matches(record, criteria)) || null);

  Model.findById = (id) => {
    const record = store[collection].find((item) => item._id === id);
    return new Query(collection, record ? [record] : []).selectOne();
  };

  Model.findByIdAndUpdate = async (criteria, update) => {
    const id = typeof criteria === "object" ? criteria._id : criteria;
    const record = store[collection].find((item) => item._id === id);
    if (!record) return null;
    Object.assign(record, update, { updatedAt: now() });
    return clone(record);
  };

  Model.findOneAndUpdate = async (criteria, update) => {
    const record = store[collection].find((item) => matches(item, criteria));
    if (!record) return null;
    Object.assign(record, update, { updatedAt: now() });
    return clone(record);
  };

  Model.findByIdAndDelete = async (id) => {
    const index = store[collection].findIndex((item) => item._id === id);
    if (index < 0) return null;
    return clone(store[collection].splice(index, 1)[0]);
  };

  Model.findOneAndDelete = async (criteria) => {
    const index = store[collection].findIndex((item) => matches(item, criteria));
    if (index < 0) return null;
    return clone(store[collection].splice(index, 1)[0]);
  };

  Model.countDocuments = async () => store[collection].length;

  Model.create = async (payload) => {
    if (Array.isArray(payload)) {
      return Promise.all(payload.map((item) => Model(item).save()));
    }
    return Model(payload).save();
  };

  return Model;
};

Query.prototype.selectOne = function selectOne() {
  this.exec = async () => {
    const records = await Query.prototype.exec.call(this);
    return records[0] || null;
  };
  return this;
};

const User = createModel("users");
const Doctor = createModel("doctors");
const Appointment = createModel("appointments");
const Notification = createModel("notifications");

const sampleUsers = [
  {
    _id: "user_admin",
    firstname: "Admin",
    lastname: "Manager",
    email: "admin@carebridge.test",
    password: "Admin123!",
    isAdmin: true,
    isDoctor: false,
    status: "accepted",
    age: 36,
    gender: "neither",
    mobile: 5550101,
    address: "CareBridge operations desk",
    pic: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80",
  },
  {
    _id: "user_patient_maya",
    firstname: "Maya",
    lastname: "Patient",
    email: "patient@carebridge.test",
    password: "Patient123!",
    isAdmin: false,
    isDoctor: false,
    status: "pending",
    age: 28,
    gender: "female",
    mobile: 5550120,
    address: "12 Wellness Avenue",
    pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
  },
  {
    _id: "user_doctor_youssef",
    firstname: "Youssef",
    lastname: "Bennani",
    email: "doctor@carebridge.test",
    password: "Doctor123!",
    isAdmin: false,
    isDoctor: true,
    status: "accepted",
    age: 41,
    gender: "male",
    mobile: 5550140,
    address: "Care Clinic, Casablanca",
    pic: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80",
  },
  {
    _id: "user_applicant_sara",
    firstname: "Sara",
    lastname: "Applicant",
    email: "applicant@carebridge.test",
    password: "Apply123!",
    isAdmin: false,
    isDoctor: false,
    status: "pending",
    age: 33,
    gender: "female",
    mobile: 5550160,
    address: "New doctor application",
    pic: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=256&q=80",
  },
  {
    _id: "user_patient_omar",
    firstname: "Omar",
    lastname: "Haddad",
    email: "omar.patient@carebridge.test",
    password: "Patient123!",
    isAdmin: false,
    isDoctor: false,
    status: "pending",
    age: 35,
    gender: "male",
    mobile: 5550180,
    address: "48 Atlas Street",
    pic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  },
  {
    _id: "user_doctor_leila",
    firstname: "Leila",
    lastname: "Mansouri",
    email: "leila.doctor@carebridge.test",
    password: "Doctor123!",
    isAdmin: false,
    isDoctor: true,
    status: "accepted",
    age: 38,
    gender: "female",
    mobile: 5550190,
    address: "Northside Care Center",
    pic: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=256&q=80",
  },
  {
    _id: "user_applicant_nadia",
    firstname: "Nadia",
    lastname: "Rahmani",
    email: "nadia.applicant@carebridge.test",
    password: "Apply123!",
    isAdmin: false,
    isDoctor: false,
    status: "pending",
    age: 44,
    gender: "female",
    mobile: 5550200,
    address: "Specialist application record",
    pic: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=256&q=80",
  },
];

const seedLocalData = async () => {
  if (store.users.length > 0) return;

  const users = {};
  for (const sampleUser of sampleUsers) {
    const { password, ...profile } = sampleUser;
    users[sampleUser.email] = await User.create({
      ...profile,
      password: await bcrypt.hash(password, 10),
    });
  }

  await Doctor.create([
    {
      _id: "doctor_youssef",
      userId: users["doctor@carebridge.test"]._id,
      specialization: "Cardiology",
      experience: 12,
      fees: 45,
      availability: "Mon-Fri, 09:00-15:00",
      isDoctor: true,
    },
    {
      _id: "doctor_leila",
      userId: users["leila.doctor@carebridge.test"]._id,
      specialization: "Pediatrics",
      experience: 9,
      fees: 40,
      availability: "Mon-Thu, 10:00-17:00",
      isDoctor: true,
    },
    {
      _id: "doctor_applicant_sara",
      userId: users["applicant@carebridge.test"]._id,
      specialization: "Dermatology",
      experience: 6,
      fees: 35,
      availability: "Tue-Thu, 10:00-16:00",
      isDoctor: false,
    },
    {
      _id: "doctor_applicant_nadia",
      userId: users["nadia.applicant@carebridge.test"]._id,
      specialization: "Neurology",
      experience: 14,
      fees: 60,
      availability: "Flexible after confirmation",
      isDoctor: false,
    },
  ]);

  const today = new Date();
  const isoDate = (offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    return date.toISOString().slice(0, 10);
  };

  await Appointment.create([
    {
      _id: "appointment_maya_youssef_today",
      userId: users["patient@carebridge.test"]._id,
      doctorId: users["doctor@carebridge.test"]._id,
      date: isoDate(0),
      time: "10:30",
      status: "Pending",
      reminder: true,
      doctorNote: "",
    },
    {
      _id: "appointment_omar_leila_tomorrow",
      userId: users["omar.patient@carebridge.test"]._id,
      doctorId: users["leila.doctor@carebridge.test"]._id,
      date: isoDate(1),
      time: "14:00",
      status: "Pending",
      reminder: false,
      doctorNote: "",
    },
    {
      _id: "appointment_maya_leila_completed",
      userId: users["patient@carebridge.test"]._id,
      doctorId: users["leila.doctor@carebridge.test"]._id,
      date: isoDate(-2),
      time: "09:00",
      status: "Completed",
      reminder: true,
      doctorNote: "Patient recovered well. Continue hydration and return if symptoms change.",
    },
    {
      _id: "appointment_omar_youssef_future",
      userId: users["omar.patient@carebridge.test"]._id,
      doctorId: users["doctor@carebridge.test"]._id,
      date: isoDate(3),
      time: "16:30",
      status: "Pending",
      reminder: true,
      doctorNote: "",
    },
  ]);

  await Notification.create([
    {
      _id: "notification_patient_upcoming",
      userId: users["patient@carebridge.test"]._id,
      content: "Your upcoming cardiology appointment is scheduled.",
    },
    {
      _id: "notification_doctor_review",
      userId: users["doctor@carebridge.test"]._id,
      content: "You have appointments waiting for review.",
    },
    {
      _id: "notification_admin_applications",
      userId: users["admin@carebridge.test"]._id,
      content: "Two doctor applications are ready for admin review.",
    },
  ]);
};

module.exports = {
  User,
  Doctor,
  Appointment,
  Notification,
  seedLocalData,
};
