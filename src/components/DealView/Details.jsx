import PropTypes from "prop-types";
import LabeledInput from "../LabeledInput";

function Details({ data }) {

  const splitIndex = Math.ceil(data.length / 2);
  const f1Data = data.slice(0, splitIndex);
  const f2Data = data.slice(splitIndex);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        {f1Data.map((item, index) => (
          <LabeledInput key={index} {...item} />
        ))}
      </div>
      <div className="w-full flex flex-col gap-5">
        {f2Data.map((item, index) => (
          <LabeledInput key={index + splitIndex} {...item} />
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