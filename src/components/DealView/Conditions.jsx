import PropTypes from 'prop-types';
import Button from '../Button';

function Conditions({ index, description }) {
  return (
    <div className="border-2 p-2 flex justify-between items-center w-full md:w-2/3 rounded-lg gap-2">
      <div>
        <span>{index}.</span>
        {" "}
        <span>{description}</span>
      </div>
      <div className="flex justify-around gap-2">
        <Button variant={"docUpload"} />
      </div>
    </div>
  );
}

Conditions.propTypes = {
  index: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Conditions;
