import * as React from 'react';

interface EmailTemplateProps {
    firstName: string,
    lastName: string,
    status: string,
}

export const EmailReservationStatusChanged: React.FC<Readonly<EmailTemplateProps>> = ({firstName, lastName, status}) => (
    <div>
        <p>Hi {firstName} {lastName},</p>
        <p></p>
        <p>We just wanted to inform you that your booking status has been changed.</p>
        <p>Previously your booking status was {status == 'ACCEPTED' ? 'REJECTED' : 'ACCEPTED'} but now is {status}.</p><br/>
        <p></p>
        <p>This e-mail is autogenerated and you can&apos;t respond to it.</p>
        <p>For any question email us to info@casa-fragola.com</p>
        <img src={`${process.env.NEXTAUTH_URL}/logo.png`} alt="Casa Fragola Logo"/>
    </div>
);