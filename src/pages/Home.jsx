import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../components/Button"
import { useTranslation } from 'react-i18next';
// import { useEffect } from "react";
// import { getSubdomain } from "../lib/utils";
// import { useAuth } from "../context/AuthContext";
// import { jwtDecode } from "jwt-decode";
import useTheme from "../hooks/useTheme";


function Home() {
  const { t } = useTranslation();
  // const { isAuthenticated } = useAuth();

  // const token = localStorage.getItem("authToken");
  // const decodedToken = jwtDecode(token);
  // const { TenantName } = decodedToken;
  
  useTheme();

  // useEffect(() => {
  //   const subdomain = getSubdomain();
    
  //   if ((!subdomain && isAuthenticated) || (subdomain!==TenantName.toLowerCase())) {
  //     localStorage.removeItem('authToken');
  //     window.location = `http://${TenantName.toLowerCase()}.localhost:5173/home`;
  //   } else {
  //     document.title = `${TenantName} | Home`;
  //   }

  // },[TenantName, isAuthenticated])
  
  
  return (
    <section className="h-full w-full flex justify-center items-center p-5">
        <div className="flex w-full h-fit justify-center items-center gap-2">
          <Link to={"/deals"}>
              <Button variant={"tile"} label={t('home.pipeDeals')} />
          </Link>
          <Link to={"/allDeals"}>
              {/* <Button variant={"tile"} label={t('home.docBtn')} /> */}
              <Button variant={"tile"} label={t('home.allDeals')} />
          </Link>
        </div>
    </section>
  )
}

export default Home


// Default Intellifi****
// Document Library****
// View Pipeline Deals (1st Tile)****
// View All  Deals (2nd Tile)****
// DealView flex styling setTop)****
// Loading everywhere)****
// Borrower Name and AccID in search)****
// tooltip for the uploadBtn)****
// Oustanding Condition)****
// dOCUMENTS LIKE PDF****