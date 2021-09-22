import styles from "../../styles/Home.module.css";
import Footer from "../components/common/Footer";
import Button from 'react-bootstrap/Button';
import Image from "next/image";
import YoutubeEmbed from "../components/common/YoutubeEmbed";
// import {ReactComponent as LandingIconEarly} from "../public/images/landing_icon_early.svg";
import LandingPartners from "../public/images/landing_partners.png";

//landing page
export default function Welcome (props){

    return(
        <div className="container-fluid" 
            style={{ 
                backgroundImage: "url('/images/landing_bg.svg')",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100vh',
                paddingRight: "0",
                padding: "0"
                }}>
            <div className="page-container-100 row align-items-center m-0">
                <div className="row col-6 justify-content-center landing-page-white-text">
                    <div className="w-75">
                        <Button size="sm"
                        style={{backgroundColor: "#F7BC76",
                            borderRadius: 10,
                            borderWidth: 0,
                            color: "black",
                            position: "absolute",
                            zIndex: 5
                        }}>
                            beta
                        </Button>
                        <Button size="sm"
                        style={{backgroundColor: "rgba(dd, dd, dd, 0.6)",
                            borderRadius: 10,
                            borderWidth: 0,
                            color: "black",
                            paddingLeft: 80,
                            paddingRight: 80
                        }}>
                            Get the latest update on our features
                        </Button>
                        <h1 className="cl-white">Meet the Future of College Counseling</h1>
                        <p>Cledge is the world's first accessible online College Counseling platform.</p>
                        <p>We use AI to help 9th to 12th grade students navigate high school and the college application process by providing personalized actionable insights.</p>
                        <Button size="lg"
                        style={{backgroundColor: "#7B95F4",
                            borderColor: "white",
                            borderRadius: 15,
                            borderWidth: 2,
                            paddingBottom: 10,
                            paddingRight: 50,
                            paddingLeft: 50
                        }}>
                            Join the Waitlist
                        </Button>
                        
                    </div>
                </div>
                <div className="row col-6 h-100">
                    <YoutubeEmbed videoId="Bly0QbY3fV4"/>
                </div>

            </div>
            <div className="page-container-100 row align-items-center justify-content-center m-0">
                <div className="text-center">
                    <h2>Features Placeholder</h2>
                </div>
            </div>
            <div className="page-container-100 row align-items-center justify-content-center bg-dark-blue m-0">
                <div className="w-50 p-3 landing-page-white-text">
                    <br />
                    <h2>The Best in Counseling Combined with Powerful Data Insights</h2>
                    <br />
                    <div className="row">
                        <div className="col-6 landing-page-gray-text">
                            <img src="/images/landing_icon_early.svg" width="20%"/>
                            <h2>Start Early</h2>
                            <p>We help students starting in 9th grade plan for college. Data shows, the earlier you start preparing, the better success students have in achieving their higher education goals.</p>
                            <p>But don’t worry, if you join later we'll get you caught up.</p>
                            <br />
                        </div>
                        <div className="col-6 landing-page-gray-text">
                            <img src="/images/landing_icon_analyze.svg" width="20%"/>
                            <h2>Analyze</h2>
                            <p>Cledge analyzes historical students data, past  placements, and holistic information to create custom learning plans for each individual.</p>
                            <br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 landing-page-gray-text">
                            <img src="/images/landing_icon_ai.svg" width="20%"/>
                            <h2>AI Powered</h2>
                            <p>Our AI will provide insights beyond college prestige to guide students in picking a college that is the right fit for them.</p>
                        </div>
                        <div className="col-6 landing-page-gray-text">
                            <img src="/images/landing_icon_privacy.svg" width="20%"/>
                            <h2>Privacy</h2>
                            <p>We will never sell or share your data with colleges or 3rd party institutions. Period.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-container-50 row align-items-center justify-content-center m-0">
                <div className="text-center w-50 p-3">
                    <h2>Partnered with the Best Technologies</h2>
                    <Image src={LandingPartners} alt="Cledge startup partners"/>
                    <p>We are part of Microsoft for Startups and have exclusive access to OpenAI Technologies. With the support of these companies, we are excited to empower every student with the latest technologies to drive their college counseling experience.</p>
                </div>
            </div>
            <div className="page-container-50 row align-items-center justify-content-center m-0 bg-light-blue">
                <div className="text-center w-75 p-3">
                <h2>Join Our Waitlist</h2>
                <div>FORM PLACEHOLDER</div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}