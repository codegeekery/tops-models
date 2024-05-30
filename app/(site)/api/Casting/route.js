import { Resend } from 'resend'; // Asegúrate de importar la librería Resend
import sanitizeHtml from 'sanitize-html';



export const POST = async (request) => {
    try {
        const { FullName,Email,PhoneNumber,City,Age,EyeColor,Height,Weight,BustSize,CurrentPlaceOfResidence,AboutMe,acceptTerms,Interest } = await request.json();

        const errors = {};

        const requiredFields = {
            FullName: 'Full name is required',
            Email: 'Email is required',
            PhoneNumber: 'Phone number is required',
            City: 'City is required',
            Age: 'Age is required',
            EyeColor: 'Eye color is required',
            Height: 'Height is required',
            Weight: 'Weight is required',
            BustSize: 'Bust size is required',
            CurrentPlaceOfResidence: 'Current place of residence is required',
            AboutMe: 'About me is required',
            acceptTerms: 'Accept terms is required to accept the terms and conditions.',
        };

        const fields = { FullName,Email,PhoneNumber,City,Age,EyeColor,Height,Weight,BustSize,CurrentPlaceOfResidence,AboutMe,acceptTerms };

        for (const field in requiredFields) {
            if (!fields[field]) {
                if (!errors[field]) {
                    errors[field] = [];
                }
                errors[field].push(requiredFields[field]);
            }
        }

        // Avoiding the empty Interest field array
        if (Interest.length === 0) {
            if (!errors.Interest) {
                errors.Interest = [];
            }
            errors.Interest.push('Interest is required. Please select at least two interest');
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
            FullName: sanitizeHtml(FullName, sanitizeConfig),
            Email: sanitizeHtml(Email, sanitizeConfig),
            PhoneNumber: sanitizeHtml(PhoneNumber, sanitizeConfig),
            City: sanitizeHtml(City, sanitizeConfig),
            Age: sanitizeHtml(Age, sanitizeConfig),
            EyeColor: sanitizeHtml(EyeColor, sanitizeConfig),
            Height: sanitizeHtml(Height, sanitizeConfig),
            Weight: sanitizeHtml(Weight, sanitizeConfig),
            BustSize: sanitizeHtml(BustSize, sanitizeConfig),
            CurrentPlaceOfResidence: sanitizeHtml(CurrentPlaceOfResidence, sanitizeConfig),
            AboutMe: sanitizeHtml(AboutMe, sanitizeConfig),
            Interest: Interest.map((interest) => sanitizeHtml(interest, sanitizeConfig)),
        };


        // Aquí debes reemplazar 'process.env.RESEND_API_KEY' con tu clave de API de Resend
        const resend = new Resend("re_kLhgU5A8_Ay9wBw2tVyPsW9z9Ai7ueRhU");


        await resend.emails.send({
            from: 'noreply@codegeekery.com',
            to: 'john.f@outlook.com.br', // Aquí debes reemplazar con la dirección de correo electrónico del propietario
            subject: 'New Message from Casting Form',
            html: `
                <p><strong>Full Name:</strong> ${sanitizedFields.FullName}</p>
                <p><strong>Email:</strong> ${sanitizedFields.Email}</p>
                <p><strong>Phone Number:</strong> ${sanitizedFields.PhoneNumber}</p>
                <p><strong>City:</strong> ${sanitizedFields.City}</p>
                <p><strong>Age:</strong> ${sanitizedFields.Age}</p>
                <p><strong>Eye Color:</strong> ${sanitizedFields.EyeColor}</p>
                <p><strong>Height:</strong> ${sanitizedFields.Height}</p>
                <p><strong>Weight:</strong> ${sanitizedFields.Weight}</p>
                <p><strong>Bust Size:</strong> ${sanitizedFields.BustSize}</p>
                <p><strong>Current Place Of Residence:</strong> ${sanitizedFields.CurrentPlaceOfResidence}</p>
                <p><strong>About Me:</strong> ${sanitizedFields.AboutMe}</p>
                <p><strong>Interest:</strong> ${sanitizedFields.Interest.join(', ')}</p>
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
