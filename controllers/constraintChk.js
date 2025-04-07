const validator = require("validator");
const mongoSanitize = require("express-mongo-sanitize");

module.exports.chKconstraint = (name, email, password) => {
    name = mongoSanitize.sanitize(name);
    email = mongoSanitize.sanitize(email);
    password = mongoSanitize.sanitize(password);

    // 2. Prevent NoSQL Injection
    const isNoSQLInjection = (input) => {
        if (typeof input !== "string") return false; // Ensure input is a string
        const forbiddenChars = ["$", "{", "}"];
        return forbiddenChars.some(char => input.includes(char));
    };

    if (isNoSQLInjection(name) || isNoSQLInjection(email) || isNoSQLInjection(password)) {
        return { valid: false, error: " Possible NoSQL Injection detected!" };
    }

    //  3. Validate Name
    if (!name || name.length < 3 || name.length > 50) {
        return { valid: false, error: " Name must be between 3 and 50 characters" };
    }

    //  4. Validate Email using `validator`
    if (!validator.isEmail(email)) {
        return { valid: false, error: " Invalid email format" };
    }

    //  5. Validate Password
    if (!password || password.length < 6) {
        return { valid: false, error: " Password must be at least 6 characters" };
    }

    return { valid: true }; 
};
