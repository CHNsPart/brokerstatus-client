import PropTypes from "prop-types";

function Documents({ index, title, description, timestamp }) {
  return (
    <div className="border-2 p-2 flex justify-between items-center w-full rounded-lg gap-2 hover:bg-zinc-100 transition-all cursor-pointer">
      <span>{index}.</span>
      <span>{title}</span>
      <span>{description}</span>
      <span>{timestamp}</span>
    </div>
  );
}

Documents.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Documents;
