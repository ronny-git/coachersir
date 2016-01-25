package com.ir.productions.coachers;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.ir.productions.coachers.entities.User;

public class MailUtils
{
	public static final String SENDER_EMAIL_ADDRESS = "coachersir@gmail.com";

	public static void sendMail(String to, String title, String body)
	{
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		try
		{
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress(SENDER_EMAIL_ADDRESS));
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
			msg.setSubject(title);
			msg.setText(body);
			Transport.send(msg);
		} catch (AddressException e)
		{
			System.out.println("email address error: " + e.getMessage());
		} catch (MessagingException e)
		{
			System.out.println("message error: " + e.getMessage());
		}

	}

	public static void sendPasswordResetMail(User user)
	{
		sendMail(
				user.getEmail(),
				"Password reset for myCoach account",
				"Your password has been reset. Your new password is: "
						+ user.getPassword());
	}

}
