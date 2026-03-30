import React from "react";
import Reveal from "@/app/components/Reveal";
export default function TestimonialSection() {
    {/* Testimonials */ }
    {/* ปรับลด padding จาก py-32 เป็น py-16 md:py-20 */ }
    return (
        <section className="py-16 md:py-20 relative z-10 flex flex-col items-center">
            <Reveal delayMs={0}>
                <h2 className="text-4xl font-bold mb-12 text-center w-full max-w-5xl text-white drop-shadow-md">
                    เสียงจากลูกค้าของเรา
                </h2>
            </Reveal>

            <Reveal delayMs={200} className="w-full flex justify-center">
                <div className="flex items-center justify-center space-x-4 md:space-x-12 w-full max-w-6xl relative">
                    <button className="z-10 text-4xl text-gray-400 hover:scale-110 transition hover:text-white p-4">&#8592;</button>

                    <div className="z-10 bg-white w-[90%] md:w-150 p-10 md:p-14 flex flex-col items-center text-center shadow-2xl rounded-3xl border border-gray-100 relative mt-8">
                        <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                            <img src="https://i.pravatar.cc/150?img=32" alt="Customer Avatar" className="w-full h-full object-cover" />
                        </div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Company Logo" className="h-6 mt-6 mb-6 opacity-60" />
                        <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
                            "ทาง Sustain Republix ช่วยให้ยอดขายออนไลน์ของเราเติบโตขึ้นกว่า 150% ภายใน 3 เดือน ทีมงานมีความเป็นมืออาชีพ ใส่ใจทุกรายละเอียดและคอยให้คำปรึกษาอย่างดีเยี่ยมครับ"
                        </p>
                        <div>
                            <p className="font-bold text-lg text-gray-900">คุณสมชาย ใจดี</p>
                            <p className="text-blue-600 font-medium text-sm">Marketing Director, Google Thailand</p>
                        </div>
                    </div>

                    <button className="z-10 text-4xl text-gray-400 hover:scale-110 transition hover:text-white p-4">&#8594;</button>
                </div>
            </Reveal>
        </section>
    );
}