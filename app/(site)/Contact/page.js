'use client'
import React, { useState } from 'react';

import {
    User,
    MailIcon,
    PhoneIcon,
    MapPin,
    MessageCircleIcon,
    Loader,
} from 'lucide-react'
import { API_URL } from '@/utils/endpoint';
import {
    Button
} from '@/components/ui/button'
import {
    toast
} from "@/components/ui/use-toast"

export default function Contact() {

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const [formData, setFormData] = useState({
        FullName: '',
        Email: '',
        PhoneNumber: '',
        City: '',
        Message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name]: ''
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch(`${API_URL}/Contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json();

        switch (res.status) {
            case 200:
                setIsLoading(false);
                setFormData({
                    FullName: '',
                    Email: '',
                    PhoneNumber: '',
                    City: '',
                    Message: ''
                })
                toast({
                    variant: 'success',
                    title: 'Message sent',
                    description: 'Message sent successfully',
                })
                console.log(data);
                break;
            case 400:
                setErrors(data.errors);
                setIsLoading(false);
                break;
            default:
                setIsLoading(false);
                console.error('An error occurred');
                break;
        }
    }




    return (
        <>
            <div className="relative w-full h-full">
                <section className="mapbox translate-y-24">
                    <figure>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7636192068094!2d-79.51342932400475!3d8.993885689535666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca900c0b0d78d%3A0x451cb4571ece8303!2sPlaza%2068!5e0!3m2!1sen!2spt!4v1717067126815!5m2!1sen!2spt"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </figure>
                </section>

                {/* Contact Form */}
                <div className='flex flex-col lg:flex-row gap-4 pt-28'>
                    {/* Label Information */}
                    <div className="p-8 max-w-4xl mx-auto text-foreground font-Raleway">
                        <span className="text-3xl font-bold block mb-2">FMA</span>
                        <h1 className="text-5xl mb-6">Contact Us</h1>
                        <div className="space-y-4">
                            <div className='flex items-center gap-3'>
                                <span className="block text-xl font-semibold">Phone</span>
                                <p className="text-md">+507 6800-7672</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <span className="block text-xl font-semibold">Email</span>
                                <p className="text-md">correo</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <span className="block text-xl font-semibold">Address</span>
                                <p className="text-md">San Francisco, Plaza 68. Calle 68 Panamá City</p>
                            </div>
                        </div>
                    </div>
                    {/* Contact Forms */}
                    <div className="p-8 w-full container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-1 relative">
                                <User className="absolute top-4 left-4 text-foreground" />
                                <input
                                    type="text"
                                    placeholder='FULL NAME'
                                    name='FullName'
                                    value={formData.FullName}
                                    onChange={handleChange}
                                    className="w-full  border-foreground bg-accent rounded-lg p-4 pl-12 outline-none text-black"
                                />
                                {errors?.FullName && errors.FullName.map((error, index) => (
                                    <p key={index} className="text-red-500 text-xs italic">{error}</p>
                                ))}

                            </div>
                            <div className="md:col-span-1 relative">
                                <MailIcon className="absolute top-4 left-4 text-foreground" />
                                <input
                                    type="email"
                                    placeholder='EMAIL ADDRESS'
                                    name='Email'
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className="w-full  border-foreground bg-accent rounded-lg pl-12 p-4 outline-none text-black"
                                />
                                {errors?.Email && errors.Email.map((error, index) => (
                                    <p key={index} className="text-red-500 text-xs italic">{error}</p>
                                ))}
                            </div>

                            <div className="md:col-span-1 relative">
                                <PhoneIcon className="absolute top-4 left-4 text-foreground" />
                                <input
                                    type="text"
                                    placeholder='PHONE NUMBER'
                                    name='PhoneNumber'
                                    value={formData.PhoneNumber}
                                    onChange={handleChange}
                                    className="w-full  border-foreground bg-accent rounded-lg pl-12 p-4 outline-none text-black"
                                />
                                {errors?.PhoneNumber && errors.PhoneNumber.map((error, index) => (
                                    <p key={index} className="text-red-500 text-xs italic">{error}</p>
                                ))}
                            </div>
                            <div className="md:col-span-1 relative">
                                <MapPin className="absolute top-4 left-4 text-foreground" />
                                <input
                                    type="text"
                                    placeholder='YOUR CITY'
                                    name='City'
                                    value={formData.City}
                                    onChange={handleChange}
                                    className="w-full  border-foreground bg-accent rounded-lg pl-12 p-4 outline-none text-black"
                                />
                                {errors?.City && errors.City.map((error, index) => (
                                    <p key={index} className="text-red-500 text-xs italic">{error}</p>
                                ))}
                            </div>


                            <div className="md:col-span-2 relative">
                                <MessageCircleIcon className="absolute top-4 left-4 text-foreground" />
                                <textarea
                                    placeholder='YOUR MESSAGE'
                                    name='Message'
                                    value={formData.Message}
                                    onChange={handleChange}
                                    className="w-full h-[240px] border-foreground bg-accent rounded-lg pl-12 p-4 outline-none text-black"
                                />
                                {errors?.Message && errors.Message.map((error, index) => (
                                    <p key={index} className="text-red-500 text-xs italic">{error}</p>
                                ))}
                            </div>

                            <div className="md:col-span-2">
                                <Button
                                    onClick={handleSubmit}
                                    className="w-full p-5"
                                >
                                    {isLoading ? <Loader className='w-5 h-5 animate-spin' /> : 'Send Message'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}