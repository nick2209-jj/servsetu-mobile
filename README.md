# ServSetu — Transparent Local Repair Service Platform

**ServSetu** is a hyperlocal repair service marketplace designed to bring complete price transparency, accountability, and digital service tracking to Indian households, housing societies, independent technicians (*mistris*), and repair shops.

---

## The Problem
When a household appliance breaks down or a plumbing/electrical emergency occurs, customers often face:
- Uncertainty about whether a local technician is verified and trustworthy.
- Hidden charges and unpredictable repair costs.
- Lack of clarity on spare part warranties or recurring issues.

## Key Features

### For Customers
- **Direct Technician Discovery:** Browse nearby Aadhaar-verified technicians with upfront visiting charges, transparent rate cards, ratings, and service rules.
- **Zero-Surprise Pre-Repair Quotations:** Technicians must submit an itemized digital quotation (spare parts + labor + warranty period) before starting work.
- **Mid-Repair Change Approval:** Any additional parts or charges discovered mid-repair require explicit customer approval via the app.
- **Conditional Payment & Flexible Checkout:** The payment option unlocks only after the technician marks the service as completed. Supports both **Online (UPI/Cards)** and **Offline (Cash with 4-digit PIN confirmation)**.
- **Digital Repair History & Warranty Tracker:** Maintain a digital service log for every appliance with active warranty countdowns and verified job reviews.

### For Technicians & Repair Shops
- **Duty Toggle & Job Management:** Accept or decline incoming service requests, build itemized on-site quotes, and manage job progress.
- **Service & Rate Card Management:** Add, update, and toggle offered services along with custom pricing and warranty terms.
- **Earnings & Monthly Reports:** Track daily/monthly income across online and offline modes and export monthly financial reports.

---

## Tech Stack
- **Mobile App:** React Native (Expo)
- **Web Dashboard:** React.js (MERN Stack — Admin, Repair Shops & Housing Societies)
- **Backend & Database:** Node.js, Express.js, MongoDB
- **Integrations:** Maps/Location Services, Push Notifications, Online Payment Gateway (UPI/Cards)

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI / Expo Go app (for mobile testing)

### Installation
```bash
# Clone the repository
git clone [https://github.com/nick2209-jj/servsetu-mobile.git](https://github.com/nick2209-jj/servsetu-mobile.git)

# Navigate into the project directory
cd servsetu-mobile

# Install dependencies
npm install

# Start the Expo development server
npx expo start
