import { Router } from "express"
import { loginSchema, registerSchema } from "./auth.validation.js";
import validation from "../../middleware/validation.js";
import { LogIn, Register } from "./auth.controller.js";
const router = Router();

// /* Register Endpoint */
router.post('/register', validation(registerSchema), Register)

// /* Log In Endpoint */
router.post('/login', validation(loginSchema), LogIn)

export default router