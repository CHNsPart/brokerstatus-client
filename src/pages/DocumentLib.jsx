import Dropdown from '../components/Dropdown';
import { exampleDocumentLibrarydata } from '../lib/utils'; // Update the path accordingly
import { useTranslation } from 'react-i18next';

function DocumentLib() {
  const { t } = useTranslation();

  return (
    <section className="h-full w-full flex justify-start items-center gap-2 p-5">
      <div className="w-1/3">
        {Object.entries(exampleDocumentLibrarydata).map(([label, options]) => (
          <Dropdown key={label} label={t(`documentLib.${label}`)} options={options} />
        ))}
      </div>
    </section>
  );
}

export default DocumentLib;
