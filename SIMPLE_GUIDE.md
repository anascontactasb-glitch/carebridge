# CareBridge Simple Guide

CareBridge is a healthcare appointment platform for patients, doctors, and administrators.

## Run

```bash
npm install
cd client
npm install
npm run build
cd ..
npm start
```

Open `http://localhost:5000`.

If `MONGO_URI` is empty, the app uses seeded local in-memory data. If `MONGO_URI` is set, run:

```bash
npm run seed
```

## Accounts

- Admin: `admin@carebridge.test` / `Admin123!`
- Patient: `patient@carebridge.test` / `Patient123!`
- Patient: `omar.patient@carebridge.test` / `Patient123!`
- Doctor: `doctor@carebridge.test` / `Doctor123!`
- Doctor: `leila.doctor@carebridge.test` / `Doctor123!`

## Test

1. Browse doctors.
2. Log in as patient and open appointments.
3. Toggle a reminder.
4. Log in as doctor and complete an appointment with a note.
5. Log in as admin and review the analytics cards and full dashboard tables.
