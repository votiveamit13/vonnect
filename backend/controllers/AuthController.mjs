import { loginUser, signupUser } from "../services/AuthService.mjs";
import { loginSchema, signupSchema } from "../validators/AuthValidator.mjs";

export const login = async (req, res) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error)
      return res.status(422).json({ message: error.details[0].message });



    const { username, password, role_id } = req.body;

    const token = await loginUser(username, password,role_id);

    res.json({ token });

  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const signup = async (req,res) => {

  try {
    const { value, error } = signupSchema.validate(req.body);


    if (error)
      return res.status(422).json({ message: error.details[0].message });


    const token = await signupUser(value);

    res.status(201).json({
      message: "User created",
      token
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};