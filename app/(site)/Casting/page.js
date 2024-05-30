'use client'
import Image from "next/image";
import { useState } from "react";
import {
    Button
} from "@/components/ui/button";

// Icons React
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaMeta } from "react-icons/fa6";
// Icons Lucide
import {
    Loader
} from 'lucide-react'
import { API_URL } from "@/utils/endpoint";

const teamMembers = [
    {
        name: "Elaine Gonzalez",
        role: "Casting Manager",
        description: "Elaine Gonzalez is a native Miamian and has been in casting since 1990. Her love of the arts and actors has contributed to her success in casting. She has an undergraduate degree from the University of Miami.",
        image: "/Gallery1.jpg",
        socials: {
            facebook: "#",
            twitter: "#",
            instagram: "#",
        },
    },
    {
        name: "Laura Lorens",
        role: "Casting Manager",
        description: "Laura Lorens is a graduate of Florida State University with a B.A. in Advertising. She has been with Lori Wyman Casting since 1995 when she started as an intern in her senior year of college. She loves being a part of bringing Florida.",
        image: "/Gallery1.jpg",
        socials: {
            facebook: "#",
            twitter: "#",
            instagram: "#",
        },
    },
    {
        name: "Jesscia Barnes",
        role: "Casting Manager",
        description: "Jesscia Barnes is a native Miamian and has been in casting since 1992. Her love of the arts and actors has contributed to her success in casting. She has an undergraduate degree from the University of Miami.",
        image: "/Gallery1.jpg",
        socials: {
            facebook: "#",
            twitter: "#",
            instagram: "#",
        },
    },
];

const InputField = ({ type, placeholder, name, value, onChange, errors }) => (
    <div className="w-full">
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className="border-foreground bg-accent rounded-lg p-4 pl-4 outline-none text-black w-full"
        />
        {errors && errors.map((error, index) => (
            <p key={index} className="text-red-500 text-xs italic">{error}</p>
        ))}
    </div>
);

const CheckboxField = ({ label, name, checked, onChange, errors }) => (
    <>
        <div className="flex flex-col">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="form-checkbox"
                />
                <span className="ml-2 text-foreground">{label}</span>
            </label>
            {errors && errors.map((error, index) => (
                <p key={index} className="text-red-500 text-xs italic">{error}</p>
            ))}
        </div>
    </>
);

export default function Casting() {

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const [formData, setFormData] = useState({
        FullName: '',
        Email: '',
        Phone: '',
        City: '',
        Age: '',
        EyeColor: '',
        Height: '',
        Weight: '',
        BustSize: '',
        CurrentPlaceOfResidence: '',
        AboutMe: '',
        acceptTerms: false,
        Interest: []
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'acceptTerms') {
                setFormData({ ...formData, acceptTerms: checked });
            } else {
                const newInterest = checked
                    ? [...formData.Interest, name]
                    : formData.Interest.filter((interest) => interest !== name);
                setFormData({ ...formData, Interest: newInterest });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch(`${API_URL}/Casting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        switch (res.status) {
            case 200:
                setIsLoading(false);
                setFormData({
                    FullName: '',
                    Email: '',
                    PhoneNumber: '',
                    City: '',
                    Age: '',
                    EyeColor: '',
                    Height: '',
                    Weight: '',
                    BustSize: '',
                    CurrentPlaceOfResidence: '',
                    AboutMe: '',
                    acceptTerms: false,
                    Interest: []
                });
                console.log(data);
                break;
            case 400:
                setErrors(data.errors);
                setIsLoading(false);
                break;
            default:
                setIsLoading(false);
                console.log("Error Internal Server")
                break
        }
    }

    // Form Configuration Component
    const inputFieldsConfig = [
        { type: 'text', placeholder: 'Full Name', name: 'FullName' },
        { type: 'text', placeholder: 'Email Address', name: 'Email' },
        { type: 'text', placeholder: 'Phone Number', name: 'PhoneNumber' },
        { type: 'text', placeholder: 'Your City', name: 'City' },
        { type: 'text', placeholder: 'Your Age', name: 'Age' },
        { type: 'text', placeholder: 'Eye Color', name: 'EyeColor' },
        { type: 'text', placeholder: 'Your Height (cm)', name: 'Height' },
        { type: 'text', placeholder: 'Your Weight (lb)', name: 'Weight' },
        { type: 'text', placeholder: 'Bust Size', name: 'BustSize' },
        { type: 'text', placeholder: 'Current Place of Residence', name: 'CurrentPlaceOfResidence' },
    ];

    const checkboxFieldsConfig = [
        { label: 'Fashion Shows/Catwalk', name: 'Fashion Shows/Catwalk' },
        { label: 'Promotional Jobs', name: 'Promotional Jobs' },
        { label: 'Singing/Musician', name: 'Singing/Musician' },
        { label: 'Presenter/MC', name: 'Presenter/MC' },
        { label: 'Corporate Events', name: 'Corporate Events' },
        { label: 'Movie/Theater Acting', name: 'Movie/Theater Acting' },
        { label: 'Hostess', name: 'Hostess' },
        { label: 'Dancing', name: 'Dancing' },
    ];

    return (
        <>

            <div className="container mx-auto px-4 translate-y-24 p-4">
                {teamMembers.map((member, index) => (
                    <div key={index} className="mb-10 flex flex-col md:flex-row items-center text-foreground">
                        <div className={`w-full md:w-1/3 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                            <Image src={member.image} alt={member.name} width={300} height={300} className="rounded" />
                        </div>
                        <div className={`w-full md:w-2/3 px-4 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                            <h2 className="text-2xl font-bold">{member.name}</h2>
                            <h3 className="text-foreground uppercase mb-4">{member.role}</h3>
                            <p className="mb-4">{member.description}</p>
                            <div className="flex space-x-4">
                                <a href={member.socials.facebook}>
                                    <FaMeta className="text-foreground border border-foreground hover:text-foreground/60 rounded-full p-1 w-[45px] h-[45px] px-2.5" />
                                </a>
                                <a href={member.socials.twitter}>
                                    <FaXTwitter className="text-foreground border border-foreground hover:text-foreground/60 rounded-full p-1 w-[45px] h-[45px] px-2.5" />
                                </a>
                                <a href={member.socials.instagram}>
                                    <FaInstagram className="text-foreground border border-foreground hover:text-foreground/60 rounded-full p-1 w-[45px] h-[45px] px-2.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-10 mb-4 p-2">
                <div className="max-w-4xl w-full space-y-8">
                    <h2 className="text-center text-3xl font-extrabold text-foreground">Registration Form</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {inputFieldsConfig.map((field, index) => (
                            <InputField
                                key={index}
                                type={field.type}
                                placeholder={field.placeholder}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                errors={errors[field.name]}
                            />
                        ))}
                        <div className="col-span-2">
                            <h3 className="text-xl font-bold text-foreground mt-6">Fields of Interest</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {checkboxFieldsConfig.map((field, index) => (
                                    <CheckboxField
                                        key={index}
                                        label={field.label}
                                        name={field.name}
                                        checked={formData.Interest.includes(field.name)}
                                        onChange={handleChange}
                                        errors={errors.Interest}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <textarea
                                placeholder="About Me"
                                name="AboutMe"
                                value={formData.AboutMe}
                                onChange={handleChange}
                                className="border-foreground bg-accent rounded-lg p-4 pl-4 outline-none text-black w-full mt-4 h-32"
                            />
                            {errors.AboutMe && errors.AboutMe.map((error, index) => (
                                <p key={index} className="text-red-500 text-xs italic">{error}</p>
                            ))}
                        </div>
                        <div>
                            <CheckboxField
                                label="I Agree to FMA Terms and Conditions"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                errors={errors.acceptTerms}
                            />
                        </div>
                        <div className="col-span-2 mt-6">
                            <Button type="submit" className="w-full">
                                {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}