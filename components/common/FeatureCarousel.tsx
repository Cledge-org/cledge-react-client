import React from "react";
import Slider from "react-slick";
import FeatureCard from "./FeatureCard";
import QuestionsIMG from '../../public/images/landing_questions.png';
import VideoIMG from '../../public/images/landing_video.png';
import ChatbotIMG from '../../public/images/landing_chatbot.png';
import SearchIMG from '../../public/images/landing_search_tool.png';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default () => {
    return (
        <Slider className='' style={{backgroundColor:'#E5E5E5'}}>
            <FeatureCard 
                title={'PERSONALIZATION QUIZES'}
                description={'Discover schools that match what’s important to you – location, majors, campus life, cost.'}
                image={QuestionsIMG}
            />
            <FeatureCard 
                title={'VIDEO LEARNING PATHWAYS'}
                description={'Every single student is unique in their interests and goals. Cledge looks to provide tailored learning experiences for every student that addresses these interests and goals.'}
                image={VideoIMG}
            />
            <FeatureCard 
                title={'AI COUNSELOR'}
                description={'An AI assistant will answer questions and provide personalized guidance based on historical data.'}
                image={ChatbotIMG}
            />
            <FeatureCard 
                title={'COLLEGE SEARCH TOOL'}
                description={'Discover schools that match what’s important to you – location, majors, campus life, cost.'}
                image={SearchIMG}
            />
        </Slider>
    )
}