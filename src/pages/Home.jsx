import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../components/Button"
import { useTranslation } from 'react-i18next';


function Home() {
  const { t } = useTranslation();
  return (
    <section className="h-full w-full flex justify-center items-center gap-2 p-5">
        <Link to={"/deals"}>
            <Button variant={"tile"} label={t('home.dealBtn')} />
        </Link>
        <Link to={"/docs"}>
            <Button variant={"tile"} label={t('home.docBtn')} />
        </Link>
    </section>
  )
}

export default Home