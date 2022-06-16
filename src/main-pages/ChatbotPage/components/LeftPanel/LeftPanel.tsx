import React, { useEffect, useState } from "react";
import FAQDropdown from "src/main-pages/ChatbotPage/components/LeftPanel/components/FAQDropdown/FAQDropdown";

function LeftPannel({
  isFullScreen,
  onReturn,
}: {
  isFullScreen?: boolean;
  onReturn?: Function;
}) {
  return (
    <div
      style={{
        width: isFullScreen ? "100%" : "50%",
        display: "flex",
        minHeight: "max-content",
        borderRight: isFullScreen ? "none" : "2px solid lightgray",
      }}
      className="flex-column px-3"
    >
      <strong className="cl-blue py-2" style={{ fontSize: "1.3em" }}>
        Welcome To the World’s First 24/7 College Counseling Chat Service!
      </strong>
      Our team at Cledge has worked extremely hard the past several months and
      collaborated with college counselors across the nation to bring you this
      24/7 chat service to answer your questions. The purpose of this service is
      to answer college- relation questions at low-cost and high speed. Below
      are frequently asked questions and instructions on how to get the most out
      of our service.
      <strong className="py-2" style={{ fontSize: "1.1em" }}>
        Is the answer generated not helpful or problematic? Fill out this form
        and a real college counselor will answer your question within 48 hours.
      </strong>
      <button
        className="cl-btn-blue mt-2 mb-1"
        onClick={() => {
          window.open("https://forms.gle/S3fzyaVm1ViX5rJn6", "_blank");
        }}
      >
        Ask
      </button>
      <FAQDropdown
        title="Best Practices"
        content={
          <>
            <strong>
              Keep questions concise, grammatically correct, and well formatted.
            </strong>
            Our service will try and answer the question that is most prevalent
            in the question you ask. The longer and more convoluted your
            question, the more likely it is that the answer will be less
            desirable. Below are examples of good and bad questions.
            <br />
            <strong>Good Questions:</strong>
            <ul>
              <li>
                Does it look good on college applications if I skip Spanish 3
                for an academic year and take it in another year in high school?
              </li>
              <li>
                Will I get rejected because my GPA dropped in senior Is it
                acceptable to have lower grades due to Covid?
              </li>
            </ul>
            <strong>Bad Questions:</strong>
            <ul>
              <li>
                How do I go about finding a list of colleges that will accept an
                average/good student to an engineering or technology program
                with lower costs? Is there a pre-published list or an app that I
                can use? For example, let’s say I want to get a list of colleges
                that may accept a student with about 3.6 GPA, 5 rigorous courses
                (AP/DE) and 1140 SAT score to mechanical engineering. And would
                cost about say $35K per year?
                <ul>
                  <li>
                    Why it’s bad: There are multiple questions in this larger
                    question. Break up questions into smaller pieces and ask
                    them individually.
                  </li>
                </ul>
              </li>
              <li>
                Do you think that AP statistics is important or necessary along
                with multi- variable calculus with Bellevue College for someone
                is going into computer science? In other words, should we take
                both AP stats and multi-variable calculus for senior year or
                would just multi-variable calculus (as running start through
                Bellevue college) be fine?
                <ul>
                  <li>
                    Why it’s bad: This is too wordy, and the actual question is
                    rephrased twice. You will get better results if you just ask
                    using the second sentence in the example above.
                  </li>
                </ul>
              </li>
            </ul>
          </>
        }
      />
      <FAQDropdown
        title="Are my questions being answered by a real human or a bot?"
        content={
          <>
            The answers to your questions are being generated by an automated
            system. However, all the answers being generated are based on
            factual information we have sources from college counselors across
            the nation. While this is an automated system, we are confident that
            the answers you will receive for most questions will be accurate and
            helpful.
          </>
        }
      />
      <FAQDropdown
        title="How can I be sure that the answers I am getting are accurate?"
        content={
          <>
            We have created this system in collaboration with college counselors
            from across the nation. They have helped us source and test our
            question answer system to make sure we have developed a product that
            will meet most user needs. However, just like any other online
            resource, it is a good idea to verify information yourself.
          </>
        }
      />
      <FAQDropdown
        title="Are the answers personalized to my situation/profile?"
        content={
          <>
            While this is the final goal, this current alpha version will answer
            questions just based off the context you provide in your question.
            If someone asks a similar question it is possible, they get a
            similar response. Stay tuned for personalization chat features in
            the coming months!
          </>
        }
      />
      {isFullScreen ? (
        <button
          className="cl-btn-blue center-child shadow align-self-center mb-3"
          style={{
            width: "15vmax",
            borderRadius: "2.5vmax",
          }}
          disabled={false}
          onClick={() => {
            onReturn();
          }}
        >
          Go to Chatbot
        </button>
      ) : null}
    </div>
  );
}

export default LeftPannel;
