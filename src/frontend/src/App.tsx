import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  CitizenFormPage,
  ConfirmationPage,
  SearchPage,
  ReviewDashboardPage,
  ReviewDetailPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CitizenFormPage />} />
          <Route path="/confirmation/:id" element={<ConfirmationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/review" element={<ReviewDashboardPage />} />
          <Route path="/review/:id" element={<ReviewDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
