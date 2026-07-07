# CareCompass Capstone Project Proposal

## Project Title

**CareCompass**

## Tagline

**Navigate care with confidence.**

## Project Summary

CareCompass is a full-stack web application designed to help patients, caregivers, and families find, compare, and organize long-term care resources. The application will focus on services such as home care agencies, managed long-term care plans, nursing homes, adult day programs, and transportation services.

The purpose of CareCompass is to make long-term care navigation easier for families who may feel overwhelmed and unsure of where to begin. Instead of only being a provider directory, CareCompass will allow users to search for resources, save providers, leave reviews, and create a personalized care journey based on their needs.

## Tech Stack

I plan to use the MERN stack:

* MongoDB for the database
* Express.js and Node.js for the backend API
* React/Next.js for the frontend
* JWT and bcrypt for authentication and password security
* Render for deployment
* GitHub for version control and project documentation

## Project Focus

This will be an evenly focused full-stack application. The frontend will focus on creating a simple and user-friendly experience for families and caregivers. The backend will focus on storing users, providers, reviews, saved resources, and care plans.

## Project Type

CareCompass will be a responsive website that users can access through a web browser on a computer, tablet, or mobile device.

## Project Goal

The goal of CareCompass is to help users confidently navigate long-term care options by giving them one place to search, organize, and track care-related resources.

Users will be able to:

* Find long-term care providers
* Filter providers by service type or location
* View provider details
* Save providers to their account
* Leave reviews and ratings
* Create a personalized care plan
* Track recommended next steps

## Target Users

The main users of this application will be:

* Family caregivers helping loved ones find long-term care services
* Older adults or disabled individuals searching for care options
* Case managers or intake workers looking for provider information
* Families trying to understand services such as MLTC, home care, nursing homes, adult day programs, and transportation

## Data Plan

I plan to create my own API and populate the database with sample provider data. The provider data will include:

* Provider name
* Service type
* County or location
* Address
* Phone number
* Website
* Description
* Services offered

The app will also store user-created data, including:

* User accounts
* Saved providers
* Reviews and ratings
* Care plans
* Care journey responses

I may use publicly available healthcare provider information as a reference, but the project will mainly use a custom MongoDB database that I create and control.

## Database Schema

The database will include several main collections.

### User

Stores account information for users.

Fields may include:

* name
* email
* password
* role
* savedProviders
* createdAt

### Provider

Stores information about long-term care providers.

Fields may include:

* name
* type
* county
* address
* phone
* website
* description
* services
* createdAt

### Review

Stores reviews left by users for providers.

Fields may include:

* userId
* providerId
* rating
* comment
* createdAt

### CarePlan

Stores personalized care plans created by users.

Fields may include:

* userId
* title
* notes
* selectedNeeds
* recommendedSteps
* savedProviders
* status
* createdAt

## Potential API Issues

Since I plan to create my own API and data, one issue may be making sure the provider data is organized and consistent. Provider types, counties, and services will need to be formatted clearly so search and filtering work correctly.

Another issue may be keeping the API routes organized as the application grows. I will separate routes for users, providers, reviews, and care plans.

I will also include error handling so the app responds properly when data is missing, a user is not logged in, or a request fails.

## Sensitive Information

The app will include user accounts, so passwords must be protected. Passwords will be hashed using bcrypt before being stored in the database.

The app will not store real medical records, Social Security numbers, Medicaid numbers, or private health information. Any care plan information will be general and used only for project demonstration purposes.

Authentication will be used so users can only access their own saved providers and care plans.

## Core Functionality

The app will include:

* User registration
* User login and logout
* Provider search
* Provider filtering
* Provider detail pages
* Save provider to favorites
* Remove provider from favorites
* Create reviews
* View provider reviews
* Create a care plan
* View saved care plans
* Dashboard for logged-in users

## User Flow

A new user will land on the homepage and learn what CareCompass does. From there, they can browse providers or create an account.

After creating an account or logging in, the user can search for long-term care resources. They can filter providers by service type or location, view provider details, save providers, and leave reviews.

The user can also complete a Care Journey Planner by answering basic questions about the type of help they are looking for. Based on their answers, the app will generate recommended next steps and allow the user to save those steps as a care plan.

## Features Beyond Basic CRUD

CareCompass will be more than a basic CRUD app because it will include a Care Journey Planner. This feature will use user responses to generate recommended next steps.

For example, if a user selects that they need home care and transportation, the app may recommend:

* Search for home care agencies
* Contact an MLTC plan
* Ask about transportation services
* Save providers to compare later

This adds guided decision-making instead of only allowing users to create, read, update, and delete data.

## Stretch Goals

If time allows, I would like to add:

* Provider comparison tool
* Interactive checklist for care plan progress
* Admin dashboard to manage providers
* Map integration
* Image upload for user profile pictures
* More advanced filtering
* Email reminders or notifications

## Project Task Breakdown

1. Design database schema
2. Source and prepare sample provider data
3. Build backend API
4. Build authentication
5. Build frontend pages and components
6. Connect frontend and backend
7. Build Care Journey Planner
8. Test application functionality
9. Deploy project
10. Finalize documentation and README
