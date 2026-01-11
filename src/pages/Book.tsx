// import Frame from '../components/Frame-cosultation';
import DisqualifiedForm from '../components/DisqualifiedForm';
import Step from './step';

const Book = () => {
  return (
    <Step
      breadcrumbs="Consultation Booking"
      title="Book a 30-min consultation with Ahmed Helal to help you identify your business issues and how can you resolve them, and to clear out the path for your brand scaling"
      progress={90}
    >
      {/* ---- Cal.com booking calendar via iframe ---- */}
      {/* <Frame /> */}
      <DisqualifiedForm />
    </Step>
  );
};

export default Book;
