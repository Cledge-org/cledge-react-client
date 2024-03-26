import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import { Button } from "react-bootstrap";
import { useWindowSize } from "src/utils/hooks/useWindowSize";
import TextBubble from "src/main-pages/CollegeEssayAssist/components/TextBubble";
import TextBubbleWithLink from "src/main-pages/CollegeEssayAssist/components/TextBubbleLearnMore";
import Image from 'next/image';
import AiResponseBox from "src/main-pages/CollegeEssayAssist/components/AiChatReponse";


const CollegeEssayAssistPage = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  function onRefresh() {
    // Place holder for taking in input from form earlier
  }


  return (

    <>
        <div className="mt-4">
          
          <Container>

          <div className="d-flex justify-content-end align-items-end ">



              <div className="ml-4">
                <div onClick={onRefresh} style={{ cursor: 'pointer' }}>
                  <Image
                    src="/images/essay_assist/refresh-button.png"
                    alt="Generate Text"
                    width={179}
                    height={43}
                    style={{ border: 'none', outline: 'none', display: 'block' }}
                    />
                  </div>
                </div>

            </div>


            <Row className="mt-5">

              <Col xs={7}>
                <TextBubble text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"/>
                <TextBubbleWithLink text="Lorem Ipsum dolar sit amet, consectetur adipiscing elit, sed do eiusmod" link="/"/>
                <textarea
                  className="form-control mt-"
                  id="essayForm"
                  style={{ height: '1000px', width: '100%' }} 
                  placeholder="Start writing or paste your essay to get started"
                ></textarea>
              </Col>

              <Col xs={5}>
                {/* Not sure what the AI is capable of spitting out yet. */}
                <AiResponseBox response={"This section is great at talking about how you are very dedicated to X. Some suggestions to make to even better would be to include more specific examples about X."} headline={"Supporting Sentences"}/>
              </Col>

            </Row>

        </Container>
      </div>
    </>
  )
};

export default CollegeEssayAssistPage
