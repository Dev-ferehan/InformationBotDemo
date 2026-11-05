import {body} from 'express-validator'
import { validationErrorHandler } from '../../middleware/validation-handler.js'

export const queryAssistantValidation=[
    body('question')
    .trim()
    .notEmpty()
    .withMessage('question is required'),


validationErrorHandler
]
    