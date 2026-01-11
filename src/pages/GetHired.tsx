// import Frame from '../components/Frame-hire';
import QualifiedForm from '../components/QualifiedForm';
import Step from './step';

const GetHired = () => {
  return (
    <Step
      breadcrumbs="Discovery Call"
      title="You're Just One Step Away From Becoming The Next Big Brand In Your Market."
      progress={90}
    >
      {/* <Frame /> */}
      <QualifiedForm />
    </Step>
  );
};

export default GetHired;
