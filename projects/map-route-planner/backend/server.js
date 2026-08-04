import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import Route from './models/Route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fallback in-memory store if MongoDB is not reachable locally
const inMemoryRoutes = new Map();
let isMongoConnected = false;

// MongoDB Connection Setup
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/route_planner';

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => {
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((err) => {
    isMongoConnected = false;
    console.warn(
      '⚠️ MongoDB connection failed or timed out. Operating with resilient in-memory fallback store:',
      err.message
    );
  });

mongoose.connection.on('connected', () => {
  isMongoConnected = true;
});
mongoose.connection.on('disconnected', () => {
  isMongoConnected = false;
});

// Root & Health Check Endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'Smart Travel Route Planner API Server',
    status: 'running',
    dbConnected: isMongoConnected,
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    dbConnected: isMongoConnected,
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/routes
 * Receives an array of destinations, generates a short ID using nanoid,
 * saves it to the database (with fallback), and returns the shortId.
 */
app.post('/api/routes', async (req, res) => {
  try {
    const { destinations, title, travelMode, totalDistance, totalDuration } = req.body;

    if (!destinations || !Array.isArray(destinations) || destinations.length === 0) {
      return res.status(400).json({
        error: 'Invalid request: "destinations" must be a non-empty array',
      });
    }

    const shortId = nanoid(8); // 8-character unique short code

    const routeData = {
      shortId,
      destinations,
      title: title || 'Travel Route',
      travelMode: travelMode || 'driving',
      totalDistance: totalDistance || 0,
      totalDuration: totalDuration || 0,
      createdAt: new Date(),
    };

    if (isMongoConnected) {
      try {
        const savedRoute = await Route.create(routeData);
        return res.status(201).json({
          message: 'Route saved successfully',
          shortId: savedRoute.shortId,
          destinations: savedRoute.destinations,
        });
      } catch (dbErr) {
        console.error('Error saving to MongoDB, using fallback:', dbErr.message);
      }
    }

    // Fallback to in-memory store if DB is disconnected or errored
    inMemoryRoutes.set(shortId, routeData);
    return res.status(201).json({
      message: 'Route saved successfully (in-memory)',
      shortId,
      destinations: routeData.destinations,
    });
  } catch (error) {
    console.error('Error creating route:', error);
    res.status(500).json({ error: 'Server error while saving route' });
  }
});

/**
 * GET /api/routes/:shortId
 * Looks up database (or fallback) by short ID and returns the saved route & destinations.
 */
app.get('/api/routes/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;

    if (isMongoConnected) {
      try {
        const route = await Route.findOne({ shortId });
        if (route) {
          return res.status(200).json({
            shortId: route.shortId,
            destinations: route.destinations,
            title: route.title,
            travelMode: route.travelMode,
            totalDistance: route.totalDistance,
            totalDuration: route.totalDuration,
            createdAt: route.createdAt,
          });
        }
      } catch (dbErr) {
        console.error('Error reading from MongoDB, checking fallback:', dbErr.message);
      }
    }

    // Fallback search in memory
    if (inMemoryRoutes.has(shortId)) {
      const route = inMemoryRoutes.get(shortId);
      return res.status(200).json(route);
    }

    return res.status(404).json({ error: 'Route not found' });
  } catch (error) {
    console.error('Error fetching route:', error);
    res.status(500).json({ error: 'Server error while fetching route' });
  }
});

/**
 * DELETE /api/routes/:shortId
 * Deletes a saved route from MongoDB and/or in-memory store.
 */
app.delete('/api/routes/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;
    let deleted = false;

    if (isMongoConnected) {
      try {
        const result = await Route.findOneAndDelete({ shortId });
        if (result) {
          deleted = true;
        }
      } catch (dbErr) {
        console.error('Error deleting from MongoDB:', dbErr.message);
      }
    }

    if (inMemoryRoutes.has(shortId)) {
      inMemoryRoutes.delete(shortId);
      deleted = true;
    }

    if (deleted) {
      return res.status(200).json({ message: 'Route deleted successfully', shortId });
    }

    return res.status(404).json({ error: 'Route not found or already deleted' });
  } catch (error) {
    console.error('Error deleting route:', error);
    res.status(500).json({ error: 'Server error while deleting route' });
  }
});

/**
 * GET /api/routes
 * List all recent routes (for testing and history)
 */
app.get('/api/routes', async (req, res) => {
  try {
    if (isMongoConnected) {
      const routes = await Route.find().sort({ createdAt: -1 }).limit(20);
      return res.json(routes);
    }
    const routes = Array.from(inMemoryRoutes.values());
    return res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Server error listing routes' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Route Planner API Server is running on port ${PORT}`);
});
