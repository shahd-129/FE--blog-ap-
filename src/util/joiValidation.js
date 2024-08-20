import Joi from "joi";

export const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
      .required()
      .messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),
    name: Joi.string().min(3).max(10).required().messages({
      "string.min": "Name should be at least 3 characters",
      "string.max": "Name should not exceed 10 characters",
      "any.required": "Name is required",
    }),
    phone: Joi.string()
      .pattern(
        new RegExp(
          /^((\+[1-9]{1,4}[ -]*)|(\([0-9]{2,3}\)[ -]*)|([0-9]{2,4})[ -]*)*?[0-9]{3,4}?[-]*[0-9]{3,4}?$/
        )
      )
      .required()
      .messages({
        "string.pattern.base": "Invalid phone format",
        "any.required": "Phone is required",
      }),
    password: Joi.string()
      .pattern(new RegExp(/^[A-Z][a-z0-9]{5,10}$/))
      .required()
      .messages({
        "string.pattern.base":
          "Password must start with an uppercase letter and be 6-11 characters long",
        "any.required": "Password is required",
      }),
  });

  const result = schema.validate(data, { abortEarly: false });
  if (!result.error) return null;

  const validationErrors = {};
  console.log(validationErrors);
  for (let item of result.error.details) {
    validationErrors[item.path[0]] = item.message;
  }
  return validationErrors;
};
