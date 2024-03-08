<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    if (!empty($name) && !empty($email) && !empty($message)) {
        $recipient = "oscarlechner@gmail.com"; // Replace with your email address
        $subject = "New message from your website";
        $email_body = "You have received a new message from your website contact form.\n\n";
        $email_body .= "Name: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Message: $message\n";

        $headers = "From: $email\r\nReply-To: $email\r\n";

        if (mail($recipient, $subject, $email_body, $headers)) {
            echo "success";
        } else {
            echo "error";
        }
    } else {
        echo "error";
    }
}
?>