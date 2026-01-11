import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import routes from './pages/Exportation';
import PageNotFound from './components/pageNotFound';

function App() {
  const location = useLocation();

  return (
    <main className="App bg-bgPrimary overflow-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

export default App;
