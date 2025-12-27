# Swasthya Sutra - Digital Health Record Management System

A comprehensive digital health record management system designed for migrant workers in Kerala, aligned with Sustainable Development Goals (SDGs).

## Features

### User Roles
- **Patient**: Access personal health records, appointments, prescriptions, and lab data
- **Doctor**: Manage patient records, appointments, and medical consultations
- **Laboratory**: Handle lab tests, results, and patient data
- **Chemist Shop**: Manage prescriptions and patient medication records

### Key Features
- **Role-based Registration**: Secure registration with document verification
- **Patient Dashboard**: Comprehensive health record management
- **Provider Dashboard**: Patient search and management tools
- **Government Schemes Integration**: Access to relevant health schemes
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: WCAG compliant with proper ARIA labels

## Technology Stack

- **Frontend**: React 18 with Hooks
- **Styling**: TailwindCSS for responsive design
- **Routing**: React Router DOM
- **State Management**: React useState and useEffect
- **Form Handling**: Custom form components with validation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js
│   ├── Card.js
│   ├── FormInput.js
│   ├── Navbar.js
│   ├── SearchBar.js
│   └── Sidebar.js
├── pages/              # Main application pages
│   ├── Onboarding.js
│   ├── PatientRegistration.js
│   ├── ProviderRegistration.js
│   ├── PatientDashboard.js
│   └── ProviderDashboard.js
├── assets/             # Static assets
└── App.js             # Main application component
```



## Features Overview

### Onboarding Flow
1. User selects their role (Patient/Doctor/Laboratory/Chemist)
2. Redirected to appropriate registration form
3. Document verification process

### Registration Process
- **Patient**: Government ID upload and verification
- **Doctor**: Medical certificate upload + interview scheduling
- **Laboratory/Chemist**: License upload + offline verification

### Patient Dashboard
- **Appointments**: View and manage medical appointments
- **Diagnosis**: Medical history and diagnosis records
- **Prescriptions**: Current and past prescriptions
- **Lab Data**: Test results and reports
- **Government Schemes**: Eligible health schemes and benefits

### Provider Dashboard
- **Patient Search**: Find patients by ID or name
- **Appointment Management**: Schedule and track appointments
- **Call Integration**: Direct calling feature for labs/chemists
- **Patient Records**: Access and update patient information

## Responsive Design

The application is fully responsive and works on:
- Desktop computers (1024px and above)
- Tablets (768px - 1023px)
- Mobile phones (320px - 767px)

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color schemes
- Focus indicators

## API Integration

The application includes placeholder API calls for:
- User registration and verification
- Patient data retrieval
- Appointment scheduling
- Medical record management
- Government scheme eligibility

## Security Features

- Form validation and sanitization
- Secure file upload handling
- Role-based access control
- Data encryption for sensitive information

