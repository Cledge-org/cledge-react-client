import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { connect } from "react-redux";
import QuickAccessLinks from "src/main-pages/DashboardPage/components/QuickAccessLinks/QuickAccessLinks";
import BlogCarouselItem from "src/main-pages/WelcomePage/components/blogsCarousel/components/BlogCaroselItem";
import NewBlogsCarousel from "src/main-pages/WelcomePage/components/blogsCarousel/NewBlogsCarousel";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import styles from "./dashboard-page.module.scss";
import Footer from "src/common/components/Footer/Footer";

const DashboardPage = ({
  accountInfo,
  dashboardParts,
  pathwaysProgress,
  ecMetrics,
  recentBlogs,
  acMetrics,
}: {
  accountInfo: AccountInfo;
  dashboardParts: PathwayPart[];
  pathwaysProgress: PathwayProgress[];
  ecMetrics: Activities;
  acMetrics: Academics;
  recentBlogs: any;
}) => {
  const [percentage, setPercentage] = useState(0);
  const router = useRouter();
  const avgTier = useMemo(
    () => (ecMetrics?.overallTier || 0 + acMetrics?.overallClassTier || 0) / 2,
    [ecMetrics, acMetrics]
  );
  const { width, height } = useWindowSize();

  const parseId = (objectId) => {
    const objectIdStr = objectId.toString();
    if (!objectIdStr.includes('"')) {
      return objectIdStr;
    }
    return objectIdStr.substring(
      objectIdStr.indexOf('"') + 1,
      objectIdStr.length - 2
    );
  };

  useEffect(() => {
    let totalPathways = 0;
    let finishedPathways = 0;
    const allPathways: Pathway[] = dashboardParts
      .map(({ dynamicRoutes }) => {
        return dynamicRoutes.map(({ route }) => route);
      })
      .reduce((prev, curr) => {
        return prev.concat(curr);
      }, []);
    allPathways?.forEach((pathway) => {
      if (
        !pathwaysProgress.find(({ pathwayId }) => {
          return pathwayId === parseId(pathway._id);
        })
      ) {
        totalPathways++;
      }
    });
    pathwaysProgress.forEach(({ finished }) => {
      if (finished) {
        finishedPathways++;
      }
      totalPathways++;
    });
    setPercentage(Math.round((finishedPathways / totalPathways) * 100));
  }, []);

  if (accountInfo.checkIns.length > 0) {
    router.push({
      pathname: "/check-ins/[checkIn]",
      query: { checkIn: accountInfo.checkIns },
    });
  }
  return (
   <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div className="border h-25">
        <div className="py-3">
          <div className="container display-4">
            Hi, {accountInfo.name.split(" ")[0]}. Welcome to the Dashboard!
          </div>
          <div className="container h4">
            Welcome to <span className="cl-blue">Cledge.</span>
          </div>
        </div>
      </div>

      <div className="border bg-secondary h-75">
        <div className="d-flex justify-content-center container h-100 w-100">
          <div className="d-flex justify-content-between h-100 w-100 flex-wrap">
            <div className="h-50 w-50 border">
              <p>yo</p>
            </div>

            <div className="h-50 w-50 border">
              <p>yo</p>
            </div>

            <div className="h-50 w-50 border">
              <p>yo</p>
            </div>

            <div className="h-50 w-50 border">
              <p>yo</p>
            </div>
          </div>


          {/* <div className="row">
            <div className="col-lg-2 border">hello</div>
            <div className="col-lg-2 border">hello</div>
          </div>
          <div className="row">
            <div className="col-lg-2 border">hello</div>
            <div className="col-lg-2 border">hello</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default connect((state) => {
  return {
    pathwaysProgress: state.pathwaysProgress,
    accountInfo: state.accountInfo,
  };
})(DashboardPage);