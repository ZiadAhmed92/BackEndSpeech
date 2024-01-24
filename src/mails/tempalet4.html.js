export let template4 =()=>{
  return`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Success</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        div {
            text-align: center;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            margin: auto;
        }

        h1 {
            color: #4caf50;
        }

        button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin-top: 15px;
        }

        button:hover {
            background-color: #45a049;
        }

        /* Responsive Styling */
        @media only screen and (max-width: 600px) {
            div {
                max-width: 80%;
            }
        }
    </style>
</head>
<body>
    <div>
        <h1>Password reset successful</h1>
        <br/>
        <a href="https://speech-emotion-roan.vercel.app/login">
            <button>Login</button>
        </a>
    </div>
</body>
</html>
`
}