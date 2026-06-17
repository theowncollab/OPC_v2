async def register_event_email(event_name):
    return {
        'subject_': 'New Event Registered',
        'body_': f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 40px 0;">
                <tr>
                    <td align="center">
                        
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            
                            <tr>
                                <td style="background-color: #000000; padding: 40px 30px; text-align: center;">
                                    
                                    <img src="https://theowncollab.github.io/image_repo/logo.png" 
                                         alt="OPC Logo" 
                                         width="150"
                                         style="display: inline-block; max-width: 100%; height: auto; margin-bottom: 20px;">
                                    <h1 style="color: #FFD700; margin: 0; font-size: 24px; letter-spacing: 1px; text-transform: uppercase;">New Event Notification</h1>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 40px 30px;">
                                    <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">Hello,</p>
                                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                                        A new event titled "<b>{event_name}</b>" has been successfully registered in the OPC system.
                                    </p>
                                    <p style="margin: 0 0 15px 0; font-size: 12px; line-height: 1.2;">
                                        To fully manage and view details of this event, please log in to the OPC Dashboard.
                                    </p>
                                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                                    <p style="margin: 0; font-size: 16px; font-weight: bold;">Best regards,</p>
                                    <p style="margin: 5px 0 0 0; font-size: 16px;">The OPC Team</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #333333; padding: 20px; text-align: center; font-size: 12px; color: #bbbbbb;">
                                    <p style="margin: 0;">&copy; 2025 OPC. All rights reserved.</p>
                                    <p style="margin: 5px 0 0 0;">In case of any issues, please contact us at <a href="mailto:opc.owncollab@gmail.com">opc.owncollab@gmail.com</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """

    }

async def welcome_email(user_name, user_type):
    return {
        'subject_': 'Welcome to OPC!',
        'body_': f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
            
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 40px 0;">
                <tr>
                    <td align="center">
                        
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            
                            <tr>
                                <td style="background-color: #000000; padding: 40px 30px; text-align: center;">
                                    
                                    <img src="https://theowncollab.github.io/image_repo/logo.png" 
                                         alt="OPC Logo" 
                                         width="150"
                                         style="display: inline-block; max-width: 100%; height: auto; margin-bottom: 20px;">
                                    <h1 style="color: #FFD700; margin: 0; font-size: 24px; letter-spacing: 1px; text-transform: uppercase;">Welcome to OPC</h1>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding: 40px 30px;">
                                    <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">Hello {{user_name or 'there'}},</p>
                                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                                        Welcome to Own Professional Collaboration! We're thrilled to have you onboard as a <b>{{user_type}}</b>.
                                    </p>
                                    <p style="margin: 0 0 15px 0; font-size: 12px; line-height: 1.2;">
                                        Get started by exploring your dashboard. We can't wait to see what you collaborate on!
                                    </p>
                                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                                    <p style="margin: 0; font-size: 16px; font-weight: bold;">Best regards,</p>
                                    <p style="margin: 5px 0 0 0; font-size: 16px;">The OPC Team</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="background-color: #333333; padding: 20px; text-align: center; font-size: 12px; color: #bbbbbb;">
                                    <p style="margin: 0;">&copy; 2025 OPC. All rights reserved.</p>
                                    <p style="margin: 5px 0 0 0;">In case of any issues, please contact us at <a href="mailto:opc.owncollab@gmail.com">opc.owncollab@gmail.com</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
    }
