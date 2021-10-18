import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header props={undefined} />
      <main>{children}</main>
      {/* <Footer/> */}
    </div>
  );
}
