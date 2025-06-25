import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import BandsListPage from './pages/Bands/BandsListPage';
import BandDetailsPage from './pages/Bands/BandDetailsPage';
import CreateBandPage from './pages/Bands/CreateBandPage';
import RehearsalsListPage from './pages/Rehearsals/RehearsalsListPage';
import RehearsalDetailsPage from './pages/Rehearsals/RehearsalDetailsPage';
import CreateRehearsalPage from './pages/Rehearsals/CreateRehearsalPage';
import ProfilePage from './pages/Profile/ProfilePage';
import AvailabilityPage from './pages/Profile/AvailabilityPage';
import NotFoundPage from './pages/NotFoundPage';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<DashboardPage />} />
              
              {/* Bands */}
              <Route path="bands" element={<BandsListPage />} />
              <Route path="bands/new" element={<CreateBandPage />} />
              <Route path="bands/:bandId" element={<BandDetailsPage />} />
              
              {/* Rehearsals */}
              <Route path="rehearsals" element={<RehearsalsListPage />} />
              <Route path="rehearsals/new" element={<CreateRehearsalPage />} />
              <Route path="rehearsals/:rehearsalId" element={<RehearsalDetailsPage />} />
              
              {/* User */}
              <Route path="profile" element={<ProfilePage />} />
              <Route path="availability" element={<AvailabilityPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;