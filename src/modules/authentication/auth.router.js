import { Router } from "express"
import { loginSchema, registerSchema } from "./auth.validation.js";
import validation from "../../middleware/validation.js";
import { LogIn, Register } from "./auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router();

// /* Register Endpoint */
router.post('/register', validation(registerSchema), asyncHandler(Register))

// /* Log In Endpoint */
router.post('/login', validation(loginSchema), asyncHandler(LogIn))

export default router