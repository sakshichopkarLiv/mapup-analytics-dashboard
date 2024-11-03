The application is hosted on Netlify and it is accessible on this link: https://672737d32d4bafa18d7f73a9--mapup-analytics.netlify.app/
---
# Electric Vehicle Analytics Dashboard

This project is a data visualization dashboard designed to showcase insights into electric vehicle (EV) population data, including charts, tables, and a search feature. Built with React, Ant Design, Tailwind CSS, and Recharts, it provides an interactive user experience for analyzing EV trends.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Installation and Setup](#installation-and-setup)
4. [Usage](#usage)
5. [Components](#components)
6. [Customization](#customization)
7. [Screenshots](#screenshots)
---

## Features

- **Data Parsing and Display**: Reads EV population data from a CSV file and displays it in a responsive table and multiple charts.
- **Interactive Filtering and Searching**: Allows users to search and filter data by various fields (e.g., County, VIN, Make, Model).
- **Dynamic Data Visualization**:
  - **Top Counties by EV Count** (Bar Chart)
  - **Vehicle Type Distribution** (Pie Chart)
  - **Top EV Manufacturers** (Bar Chart)
  - **Model Year Distribution** (Bar Chart)
  - **CAFV Eligibility** (Pie Chart)
- **Responsive Sidebar Navigation**: Toggle between table and chart views with a responsive sidebar and drawer.
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS and Ant Design components.

## Project Structure

```
src
├── App.css                          # Main Tailwind CSS and custom styles
├── components                       # All reusable components
│   ├── BarChartByCounty.js          # Bar chart showing top counties by EV count
│   ├── CAFVEligibilityPieChart.js   # Pie chart showing CAFV eligibility distribution
│   ├── EVTypePieChart.js            # Pie chart for vehicle type distribution
│   ├── ModelYearDistributionChart.js # Bar chart for model year distribution
│   ├── SearchComponent.js           # Search component for filtering table data
│   ├── TopEVMakesBarChart.js        # Bar chart for top EV manufacturers
│   └── styles/ChartStyles.css       # Custom styles for chart components
├── pages                            # Main dashboard page
│   └── Dashboard.js                 # Main Dashboard component
├── utils
│   └── csvParser.js                 # Utility to parse CSV data with PapaParse
└── index.js                         # Application entry point
```

## Installation and Setup

### Prerequisites

- **Node.js** and **npm** installed on your machine.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd electric-vehicle-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Application**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

### CSV Data

Place the CSV file (`Electric_Vehicle_Population_Data.csv`) at the root of your `public` directory to ensure proper loading by the app.

## Usage

1. **Navigate the Sidebar**:
   - Toggle between **Charts** and **Table** views using the sidebar or drawer menu.

2. **Search and Filter**:
   - Use the search bar to filter data by county, VIN, make, or model.
   - Select specific filters in the table view for more refined results.

3. **View Charts**:
   - Switch to the **Charts** view to visualize data on various metrics, such as the most popular EV makes, model year distribution, and CAFV eligibility.

## Components

### 1. `Dashboard.js`

The main page component. Loads data, manages the sidebar and drawer, and renders charts or table views based on user selection.

### 2. Chart Components

- **`BarChartByCounty`**: Displays the top 6 counties with the most EV registrations.
- **`EVTypePieChart`**: Shows distribution of EV types (e.g., battery, hybrid).
- **`TopEVMakesBarChart`**: Highlights the top 5 EV manufacturers.
- **`ModelYearDistributionChart`**: Visualizes the distribution of EV model years.
- **`CAFVEligibilityPieChart`**: Illustrates the breakdown of CAFV eligibility.

### 3. `SearchComponent.js`

Provides a debounced search interface for filtering EV data. Allows selection of search fields and debounced input handling for smoother search performance.

### 4. `csvParser.js`

Utility function that fetches and parses the CSV data using [PapaParse](https://www.papaparse.com/) for smooth data handling.

## Customization

1. **Change Chart Colors**:
   - Chart colors are specified in each chart component within the `COLORS` array. Update these arrays as desired.

2. **Update Layout Styles**:
   - Custom styling for summary cards, charts, and legends are in `ChartStyles.css` and `App.css`.

3. **Responsive Design Adjustments**:
   - Tailwind CSS classes in `App.css` ensure responsiveness, but you can adjust them for custom breakpoints.

## Screenshots
---
