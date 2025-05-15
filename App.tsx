import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StyleSheet, Text, View } from 'react-native';
import BookingPage from './src/pages/BookingPage';

export default function App() {
  return (
    <Router>
      <Routes>       
        <Route path="/bookings" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
