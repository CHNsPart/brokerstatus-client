import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../components/Button"
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { getSubdomain } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";


function Home() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const { TenantName } = decodedToken;
  
  useEffect(() => {
    const subdomain = getSubdomain();
    
    if ((!subdomain && isAuthenticated) || (subdomain!==TenantName.toLowerCase())) {
      localStorage.removeItem('authToken');
      window.location.href = `http://${TenantName.toLowerCase()}.localhost:5173/home`;
    }
  },[TenantName, isAuthenticated])
  
  return (
    <section className="h-full w-full flex justify-center items-center p-5">
        <div className="flex w-full h-fit justify-center items-center gap-2">
          <Link to={"/deals"}>
              <Button variant={"tile"} label={t('home.dealBtn')} />
          </Link>
          <Link to={"/docs"}>
              <Button variant={"tile"} label={t('home.docBtn')} />
          </Link>
        </div>
    </section>
  )
}

export default Home