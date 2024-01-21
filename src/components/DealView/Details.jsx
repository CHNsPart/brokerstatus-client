import PropTypes from "prop-types";
import LabeledInput from "../LabeledInput";

function Details({ data }) {
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        {data.map((item, index) => (
          <LabeledInput key={index} {...item} />
        ))}
      </div>
      <div className="w-full flex flex-col gap-5">
        {data.map((item, index) => (
          <LabeledInput key={index} {...item} />
        ))}
      </div>
    </>
  );
}

Details.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Details;
