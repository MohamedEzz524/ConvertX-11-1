import Button from '../components/Button';
import Step from './step';

const Warn = () => {
  return (
    <Step
      breadcrumbs="Not Qualified Yet"
      title="Unfortunately you won’t be a good fit for us at your current stage, however we can still help you out through a consultation."
      progress={40}
    >
      <div className="mt-15 flex gap-4">
        <Button text="PREV STEP" type="outline" link="/getting-started" />
        <Button
          text="BOOK CONSULTATION"
          type="bulk"
          link="/book-consultation"
        />
      </div>
    </Step>
  );
};

export default Warn;
