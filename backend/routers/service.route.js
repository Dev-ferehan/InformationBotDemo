import express from 'express'
import {getGovernmentServicesComponent} from '../components/service.component.js';
export const serviceRoute = express.Router();
serviceRoute.get('/',getGovernmentServicesComponent)