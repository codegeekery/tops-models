import { Resend } from 'resend'; // Asegúrate de importar la librería Resend
import sanitizeHtml from 'sanitize-html';



export const POST = async (request) => {
    try {
        const { FullName, Email, PhoneNumber, City, Message } = await request.json();

        const errors = {};

        const requiredFields = {
            FullName: 'Full name is required',
            Email: 'Email is required',
            PhoneNumber: 'Phone number is required',
            City: 'City is required',
            Message: 'Message is required'
        };

        const fields = { FullName, Email, PhoneNumber, City, Message };

        for (const field in requiredFields) {
            if (!fields[field]) {
                if (!errors[field]) {
                    errors[field] = [];
                }
                errors[field].push(requiredFields[field]);
            }
        }


        // Expressions regular para validar el email y el teléfono del usuario Ejemplo: +1 123 456 7890

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const OverWorldPhoneRegex = /^[+]\d{1,4}[-.\s]?[(]?\d{1,3}[)]?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

        if (!emailRegex.test(Email)) {
            if (!errors.Email) {
                errors.Email = [];
            }
            errors.Email.push('Invalid email format');
        }

        if (!OverWorldPhoneRegex.test(PhoneNumber)) {
            if (!errors.PhoneNumber) {
                errors.PhoneNumber = [];
            }
            errors.PhoneNumber.push('Invalid phone format. Use format: +XXX XXXX XXXX Make sure to include the country code.')
        }



        if (Object.keys(errors).length > 0) {
            // Transformar el objeto de errores en un objeto de arrays
            const formattedErrors = {};
            for (const key in errors) {
                formattedErrors[key] = errors[key];
            }

            return new Response(JSON.stringify({ errors: formattedErrors }), {
                status: 400,
                headers: { "content-type": "application/json" },
            });
        }


        // Configuración estricta para sanitizar los campos
        const sanitizeConfig = {
            allowedTags: [], // No permitir ninguna etiqueta HTML
            allowedAttributes: {} // No permitir ningún atributo
        };

        // Sanitizar todos los campos
        const sanitizedFields = {
            name: sanitizeHtml(FullName, sanitizeConfig),
            email: sanitizeHtml(Email, sanitizeConfig),
            message: sanitizeHtml(Message, sanitizeConfig),
            phone: sanitizeHtml(PhoneNumber, sanitizeConfig),
        };


        // Aquí debes reemplazar 'process.env.RESEND_API_KEY' con tu clave de API de Resend
        const resend = new Resend("re_kLhgU5A8_Ay9wBw2tVyPsW9z9Ai7ueRhU");


        await resend.emails.send({
            from: 'noreply@codegeekery.com',
            to: 'john.f@outlook.com.br', // Aquí debes reemplazar con la dirección de correo electrónico del propietario
            subject: 'New Message from Contact Form',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333; margin-bottom: 20px;">New Message from Customer ${sanitizedFields.name}</h1>
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
                    <p style="margin-bottom: 10px;"><strong>Email:</strong> ${sanitizedFields.email}</p>
                    <p style="margin-bottom: 10px;"><strong>Phone:</strong> ${sanitizedFields.phone}</p>
                    <p style="margin-bottom: 10px;"><strong>Message:</strong></p>
                    <p style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">${sanitizedFields.message}</p>
                </div>
            </div>
            `,
        });

        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ ok: false, error: 'An error occurred' }), {
            status: 500,
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        });
    }
};
