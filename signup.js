<page contentType="text/html;charset=UTF-8" language="java">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up | Wands and Words Bookstore</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: url('DALL·E 2024-11-21 17.11.34 - A cozy, softly blurred library background with tall wooden bookshelves filled with books, illuminated by a gentle purple and warm light. The atmospher.webp') no-repeat center center fixed;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #fff;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        .signup-box {
            background-color: #ecd0a5;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 500px;
            text-align: center;
        }

        .signup-box h2 {
            color: #40025e;
            margin-bottom: 10px;
            font-size: 24px;
        }

        .signup-box h3 {
            color: #5b0484;
            margin-bottom: 20px;
            font-size: 18px;
        }

        .signup-box label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            font-size: 16px;
            text-align: left;
        }

        .signup-box input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
        }

        .signup-box button {
            width: 100%;
            padding: 10px;
            background-color: #4A2C7A;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }

        .signup-box button:hover {
            background-color: #6A49A3;
        }

        .signup-box .login-link {
            margin-top: 10px;
            font-size: 12px;
        }

        .signup-box .login-link a {
            color: #4A2C7A;
            text-decoration: none;
        }

        .signup-box .login-link a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="signup-box">
            <h2>WANDS AND WORDS</h2>
            <h3>Sign Up</h3>
            
            <script>
                              
                String message = "";
                if ("POST".equalsIgnoreCase(request.getMethod())) {
                    String name = request.getParameter("name");
                    String email = request.getParameter("email");
                    String password = request.getParameter("password");
                    String confirmPassword = request.getParameter("confirmPassword");

                    if (name == null || name.isEmpty() || email == null || email.isEmpty() ||
                        password == null || password.isEmpty() || confirmPassword == null || confirmPassword.isEmpty()) {
                        message = "All fields are required.";
                    } else if (!password.equals(confirmPassword)) {
                        message = "Passwords do not match.";
                    } else if (password.length() < 6) {
                        message = "Password must be at least 6 characters long.";
                    } else {
                        // If signup is successful, redirect to the homepage
                        response.sendRedirect("homepage.html");
                        return;
                    }
                }
            

             if (!message.isEmpty()) { 
                <p style="color: <%= message.contains("successfully")? "green"  : "red" >;"><= message></p>
             } 
             </script>

            <!-- Signup form -->
            <form action="homepage.html" method="post">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your full name" required>

                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>

                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>

                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required>

                <a href="homepage.html"><button type="submit">Sign Up</button></a>
            </form>
            
            <div class="login-link">
                <p>Already have an account? <a href="loginjava.html">Log in</a></p>
            </div>
        </div>
    </div>
</body>
</html>
