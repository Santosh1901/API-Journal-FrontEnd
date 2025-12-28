# API Journal Frontend

A modern responsive web interface for the API Journal backend.  
This frontend consumes a live FastAPI backend and provides a clean user experience for creating viewing and managing journal entries.

The project is built as a standalone frontend application and deployed independently.

## What this application does

This frontend allows users to

1 Create a journal entry  
2 View a list of all journal entries  
3 View a single journal entry in detail  
4 Delete a journal entry  
5 See automatically enriched fields like mood topics and summary when available  

All data is fetched dynamically from a deployed backend API.

## Tech stack

React with TypeScript  
Vite for fast development and builds  
Tailwind CSS for modern responsive styling  
Axios for API communication  

The app is designed to be lightweight fast and easy to extend.

## Architecture overview

This project follows a clean separation of concerns.

UI components handle presentation only  
API communication is centralized using a service layer  
The backend base URL is injected using environment variables  
No backend logic or assumptions are hardcoded in the UI  

The frontend is fully decoupled from backend implementation details.

## Backend integration

This frontend consumes a deployed FastAPI backend with endpoints such as

GET api entries  
GET api entries by id  
POST api entries  
DELETE api entries  

The backend may optionally enrich entries using AI in the background but the frontend works regardless of AI availability.

## Environment variables

Create a .env file in the project root with the following value

