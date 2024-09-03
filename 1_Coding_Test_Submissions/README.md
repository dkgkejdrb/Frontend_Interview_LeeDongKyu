## 📌 Project Introduction

**NOTICE: This source code is my submission for a coding test as a application process. The code received a high score, allowing me to successfully pass the test due to its quality.**

This project provides functionality for administrators to set up schedules and infrom user of operationg hours.

Key features are:

1. Managing class periods by time slot
2. Configuring start and end times for classes
3. Offering a responsive UI for both tablet PCs and desktops

--------

### Coding Test Requirements (2024.08.10 ~ 11)

1. **Submission is completed within 2days.**

2. **Automatic Adjustment of Class Periods:** When adding or deleting a class period, subsequent periods should automatically adjust. For example, if there are three periods and the second period is deleted, the third period should shift to become the second period. Similarly, if a new period is added in the morning slot while periods exist in the afternoon slot, the existing afternoon periods should be renumbered accordingly.
3. **Limit on Class Periods per Time Slot:** Each time slot (morning, afternoon, evening) can manage a maximum of 5 periods. For example, if there are 5 periods in the morning slot and one period in the afternoon, deleting the 5th period should shift the afternoon period to the 5th slot in the morning.
4. **Confirmation Modal on Deletion:** A confirmation modal should appear when the delete button is clicked to verify the deletion action.
5. **Time Selection for Schedule:** Users should be able to select the time for each period. This includes selecting the hour (00-24) and minute (00-59) for each time block.
6. **Page Path:** The page should be accessible via the `/timetable` route.
7. **Responsive UI Design:** Although most users will access the application via tablet PCs, it should also be usable on desktops. The page width should be set to a maximum of 1024px and centered on the screen.
8. **Example of the UI screen that they asked me to submit**:
   ![](https://codetutorbot.blob.core.windows.net/image/3-1.png)





## ⚙️ Installation and Running

### Requirements

- Node.js (v >= 14.0.0)
- npm (Node Package Manager)



### Tool

- IDE: Visual Studio Code
- Language: Typescript
- Framework: React (v18.3.3)



### Node.js Installation

To run this project, you need Node.js. If you have already installed Node.js, you can skip the following process.

1. #### Download and Install Node.js

   Visit the Node.js website and download the latest LTS version according to your OS. After downloading the installer, run and install Node.js

   

2. #### Verify installation

   On termianl or command propmt, type the following commands in order to check the versions of Node.js and npm.

   ```bash
   node -v
   npm -v
   ```

   If above commands return the version of Node.js and npm, the installation was successful.



### Project Setup and Execution

1. #### Download

   Download the project and unzip it.

   

2. #### Install packages

   Install the project's dependancies by running:

   ```bash
   npm install
   ```

3. #### Start the dev server

   ```bash
   npm start
   ```

4. #### Check in the borwser

   After the server starts, open your browser and go to http://localhost:3000/. You will see the home screen and click a button('Set Up Timetable').

   ![](https://codetutorbot.blob.core.windows.net/image/3-2.png)

   ![](https://codetutorbot.blob.core.windows.net/image/2.png)



## 📁 Project Structure

### 1. Route Pages

#### 1.1. Description

Navigation between pages is managed using react-router-dom



#### 1.2. File Locations in the Project

- **src/App.tsx** : Contains the routing configuration
- **src/pages**/ : Directory for diffrent pages
  - **Home.tsx** : Home page
  - **TimeTable.tsx** : Timetable page



#### 1.3. Library Used

- **react-router-dom**





### 2. Control Global State for API Connections

#### 2.1. Description

Timetable data from ERP system, such as registration and revision data, is managed in the global state via API.



#### 2.2. File Locations in the Project

- **src/store/index.ts** : Contains Redux store configurations
- **src/store/slice/TimeTableSlice.ts** : Global state and reducers for timetable data 
- **src/hooks/** : Custom hook directory
  - **useTimeTableData.tsx** : Gets timetable data fromthe ERP system



#### 2.3. Libary Used

- **@reduxjs/toolkit**
- **react-redux**





### 3. Reusable UI Componetns

#### 3.1. Descriptions

UI Components used for the a responsive UI(tablet PC: 600px, desktop: 1024px) and for managing the timetable for an administrator



#### 3.2. File Locations in the Project

- **src/pages/TimeTable.tsx** : Configures the timetable, and manages pages
- **src/components/** : Directory
  - **Periods.tsx** : Adds classes, delete theme and sets time slots
  - **MyTimePicker.tsx** : Selects hour(0~24) and minute(0~59)



#### 3.3. Library Used

- **antd**





## 💡 Enhancements 

### 1. Designing for API Connection

To dynamically display information from the ERP system via API, components were designed and developed accordingly. Before starting the project, I identified the necessary data to be dsiplayed on the screen and defined the corresponding data interfaces. Based on these interfaces, I set up dummy data for development.

Specifically, I decided to use a list data type for the feature of adding and deleting classes. This choice made it easier to develop key features and significantly reduced the time required for testing and debugging.

[Example of Data Strucutre for API Connection]

![](https://codetutorbot.blob.core.windows.net/image/5.png)



[Data Interface]

```json
// src/hooks/useTimeTableData.tsx
// key: class name, displayed on Tab. 
// value: each class consists of an array of up to 15 classes.
// The maximum length of the array is 15. Each element of the array represents a time slot for a day and includes both startTime and endTime.
{
    "2A-1 (201~)": [
        { "startTime": "08:00", "endTime": "08:50" },
        { "startTime": "09:00", "endTime": "10:15" },
        { "startTime": "10:30", "endTime": "12:00" },
        { "startTime": "", "endTime": "" }, // Empty space means no class
        { "startTime": "", "endTime": "" }
    ],
    ...
}
```





### 2. Optimazation for Table PC Screen

Since most users will be accessing this system on table PCs, the maximum screen width has been set to 600px. To accomodate this, the width of the components has been reduced, and their height has been optimized to display more components effectively.

[Table PC(600px and above)]

![](https://codetutorbot.blob.core.windows.net/image/3.png)



### 3. Component Customization

To meet the requirements of this test, I searched extensively for a library that would allow users to select hours (00~24) and minute(00~59). However, no suitable lbrary was available, so I developed a custom TImePicker component.

During the development process, I encountered challenges in understanding how users would configure the time slots and how that data would be posted to the ERP system. To address this issue, I added on 'OK' button to the TImePicker component. When the user clicks this button, the data is updated and sent to the ERP system.

To close the TImePicker, the user must press the 'OK' button. This design choice ensures that users interact with the system correctly.

[Example of Using MyTimePicker]

![](https://codetutorbot.blob.core.windows.net/image/3.gif)





## 🤔 Reflections...

while working at CREVERSE, I mainly used Javascript for service development. Because of this, I've been eager to learn and work with TypeScript to enhance my skills. Completing this coding test in a practical environment allowed me to do just that, and I enjoyed the experience of using TypeScript.

AS I worked through the task, I gained a deeper understanding of the test's purpose. The test maker isn't just looking for someone who can develop a front-end page. They want someone who can do so effectively, with careful consideration of the underlying data structure.

This experience is valuable in considering many thing to become a good forntend-developer.
