## Project Introduction

**NOTICE_1: This source code is a demo version of a GPT-4 based code review web system for usability testing.**

**NOTICE_2:  You can view the details of my thesis through the following arXiv link: https://arxiv.org/pdf/2407.04722**



Key features are:

![](https://codetutorbot.blob.core.windows.net/image/3-3.png)

1. This area provides a exercise choice function organized in a tree  format so that learners can examine and select various problems. 

2. This area shows the details of the selected problem (the exercise  requirements, input examples, and output examples). 

3. This is a Python editor for writing code. When a user clicks ‘Ask  Code Tutor’, the annotation ‘Code to fix’ is added to the part of the  submitted code that needs to be modified, as shown in Figure 7. 

   ![](https://codetutorbot.blob.core.windows.net/image/3-4.png)

4. This button submits the code a learner wrote in ‘Your Code’, and  the code correctness check module using GPT-4 determines whether the  submitted code is correct and displays the correctness and error status  in a pop-up as shown in Figure 8. 

   ![](https://codetutorbot.blob.core.windows.net/image/3-5.png)

5.  This button requests code review comments through the GPT-4 endpoint  using the Code Review Module.

6.  This area shows the feedback received from GPT-4, which can be seen  in Figure 9.

   ![](https://codetutorbot.blob.core.windows.net/image/3-6.png)

--------

## System Configuration and Environment 

![](https://codetutorbot.blob.core.windows.net/image/3-7.png)



## Enhancing the Initial System for Improved Usability 

![](https://codetutorbot.blob.core.windows.net/image/3-8.png)





## Project Structure

- **public/quizList_en.ts**: Coding quiz tree data node
- **src/app/**
  - **page.tsx**: UI for usability testing
  - **api/genAnswerCheck/route.ts**: API to check if the student's submitted code is correct
  - **api/genCodeFeedback/route.ts**: API to request feedback on the student's submitted code
  - **components/Timer.tsx**: Component that displays response time on the screen
  - **prompt-modules/**: Directory for core modules that compose prompts
    - **answerCheckModule.ts**: Prompt module used by AI to determine if the student's submitted code is correct
    - **codeFeedbackModule.ts**: Prompt module used by AI to generate feedback on the student's submitted code



## Conclusions and Furthe Study

The results  demonstrated a performance to accurately identify error types, shorten  response times, lower API call costs, and maintain high-quality code  reviews without major issues. Feedback from participants affirmed the  tool’s suitability for teaching programming to primary and secondary  school students. Given these benefits, the system is anticipated to be a  efficient learning tool in programming language learning for educational  settings.

In follow-up research, it is necessary to further improve usability,  introduce a membership management system, and verify the effectiveness of  the system with primary and secondary school students.
