# Travel Booking App

A complete end-to-end web application where users can explore travel experiences, select available slots, and complete bookings.

## 🚀 Features

- **Home Page**: Browse and filter travel experiences
- **Details Page**: View experience details, available dates, and time slots
- **Checkout Page**: Complete booking with user information and promo codes
- **Result Page**: Booking confirmation or failure messages
- **Responsive Design**: Mobile-friendly UI with TailwindCSS
- **Form Validation**: Email, phone, and required field validation
- **Promo Codes**: Apply discount codes (SAVE10, FLAT100, WELCOME20)
- **Loading States**: Clear feedback during API calls
- **Mock Data**: Works without backend for development

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Hooks

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure API endpoint:
```bash
cp .env.example .env
# Edit .env to set VITE_API_BASE_URL
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ExperienceCard.tsx      # Experience card component
│   └── shared/
│       ├── Header.tsx           # App header/navigation
│       └── LoadingSpinner.tsx   # Loading indicator
├── pages/
│   ├── HomePage.tsx             # List of experiences
│   ├── DetailsPage.tsx          # Experience details & slot selection
│   ├── CheckoutPage.tsx         # Booking form & payment
│   └── ResultPage.tsx           # Booking confirmation/failure
├── services/
│   └── api.ts                   # API service with mock data
├── types/
│   └── index.ts                 # TypeScript interfaces
├── App.tsx                      # Main app component with routing
├── main.tsx                     # App entry point
└── index.css                    # Global styles with Tailwind
```

## 🎨 Design Features

- Clean and modern UI
- Consistent spacing and typography
- Responsive grid layouts
- Hover and focus states
- Smooth transitions
- Color-coded status indicators
- Mobile-optimized navigation

## 🔌 API Integration

The app is designed to consume backend APIs but includes mock data for development:

### Expected API Endpoints:
- `GET /api/experiences` - List all experiences
- `GET /api/experiences/:id` - Get experience details
- `GET /api/experiences/:id/slots` - Get available slots
- `POST /api/bookings` - Create a booking
- `POST /api/promo/validate` - Validate promo code

### Mock Data:
When the backend is unavailable, the app uses built-in mock data with:
- 6 sample experiences
- Dynamic slot generation
- 3 promo codes (SAVE10, FLAT100, WELCOME20)

## 🧪 Testing Promo Codes

- `SAVE10` - 10% discount
- `FLAT100` - $100 off
- `WELCOME20` - 20% discount

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Development

- Uses TypeScript for type safety
- ESLint for code quality
- Hot Module Replacement (HMR) with Vite
- Modular component architecture

## 📄 License

This project is for educational purposes.

## 👥 Author

Built as part of a fullstack development assignment.
