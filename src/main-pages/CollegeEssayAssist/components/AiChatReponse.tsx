import React, { useState } from 'react';
import Image from 'next/image';
import Form from 'react-bootstrap/Form';


function AiResponseBox({ response, headline }) {

  const[isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  function onRefresh() {
    //Place holder for AI API
  }

  function clickThumbsUp() {
    // Place holder for thumbs up API
  }

  function clickThumbsDown() {
    // Place holder for thumbs down
  }


   const boxStyle = {
    backgroundColor: '#F0EFF6', 
  };

   return (
    <div className="">
      {isExpanded ? (
        <>
          <div className="p-3 border rounded" style={{backgroundColor : "#FAFAFC",}}>
            <div className="py-1 border-bottom d-flex justify-content-end">
              <div className='pe-2'>
                <Image
                  src="/images/essay_assist/checkmark.png"
                  alt="Checkmark solved"
                  width={16}
                  height={16}
                  style={{border: 'none', outline: 'none', display: 'block'}}
                  />
              </div>

              <div onClick={onRefresh} style={{ cursor: 'pointer' }}>
                <Image
                  src="/images/essay_assist/regenerate-chatbot.png"
                  alt="Regenerate Reponse"
                  width={99}
                  height={17}
                  style={{ border: 'none', outline: 'none', display: 'block'}}
                  />
              </div>
            </div>

            <div className='h4 pt-4' style={{ color: '#070452'}}>
                {headline}
            </div>

            <div className='pt-3 h5' style={{ color: '#070452'}}>
              {response}
            </div>

            <div className='pt-4'>
              <Form>
                <Form.Group className="mb-3" controlId='chatBotForm'>
                  <div className="d-flex align-items-center">
                    <Form.Control type="userResponse" placeholder="Ask Questions"/>

                    <div className="ps-2 pt-1"  onClick={onRefresh} style={{ cursor: 'pointer' }}>
                      <Image
                        src="/images/essay_assist/send.png"
                        alt="Regenerate Reponse"
                        width={38}
                        height={38}
                        style={{ border: 'none', outline: 'none', display: 'block'}}
                        />
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </div>

            <div className='pt-2 d-flex justify-content-end align-items-end'>
              <div className='pe-1' onClick={clickThumbsDown} style={{ cursor: 'pointer' }}>
                      <Image
                        src="/images/essay_assist/thumbs-down.png"
                        alt="Regenerate Reponse"
                        width={28}
                        height={28}
                        style={{ border: 'none', outline: 'none', display: 'block'}}
                      />
              </div>

              <div className='pe-1' onClick={clickThumbsUp} style={{ cursor: 'pointer' }}>
                      <Image
                        src="/images/essay_assist/thumbs-up.png"
                        alt="Regenerate Reponse"
                        width={28}
                        height={28}
                        style={{ border: 'none', outline: 'none', display: 'block'}}
                      />
              </div>
            </div>
          </div>
        </>
      ):          
        <div style={boxStyle} className={"p-3 border rounded"} onClick={handleExpand}>
          <div className='h5' style={{ color: '#808099'}}>
            {headline}
          </div>

          <div className='pt-5' style={{ color: '#070452'}}>
            {response}
          </div>
        </div> 
      }

    </div>

   )
}

export default AiResponseBox