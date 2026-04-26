# Birth Registration System – Frontend

This repository contains the frontend application of the Birth Registration System. The application provides a structured interface for citizens, hospitals, and municipal authorities to manage the complete lifecycle of birth registration and certificate generation.

The system follows a government-style workflow where a birth registration request is submitted by a citizen, verified by a hospital, approved by the municipal authority (BMC), and finally converted into a digitally generated birth certificate.

## Overview

The frontend is designed as a multi-dashboard application with role-based functionality. It communicates with backend APIs to handle registration submission, verification, approval, and certificate retrieval. The application also includes a print-ready certificate layout that closely resembles official government-issued documents.

## System Workflow

Citizen -> Hospital -> BMC -> Certificate Generation

## Modules

### Citizen Dashboard
The citizen module allows users to register birth details and access their certificate.
* Submit birth registration form
* Receive application ID
* View certificate after approval
* Print certificate in A4 format
* Perform multiple registrations

### Hospital Dashboard
The hospital module is responsible for the initial verification of submitted records.
* View pending birth registrations
* Verify submitted details
* Approve or reject applications
* Forward approved records to the municipal authority

### BMC Dashboard
The municipal authority performs the final verification and certificate generation.
* View hospital-approved applications
* Perform final approval or rejection
* Generate birth certificate
* Assign registration number
* Make certificate available to the user

## Certificate System

The application generates a digital birth certificate with the following characteristics:
* Government-style structured layout
* Legal reference (Registration of Births & Deaths Act, 1969)
* Detailed birth and parent information
* QR code for digital verification
* Digital signature section
* Print-ready A4 format

## Technology Stack

* React.js
* Bootstrap
* Axios
* React Router

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
git clone git clone https://github.com/smitapatil54/birth-registration-frontend.git

2. Install dependencies:
npm install

3. Start the application:
npm start

## Live Application

birth-registration-frontend-jroahv6vi-smitapatil54s-projects.vercel.app
