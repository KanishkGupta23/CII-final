import React from 'react';

const MyApplications = () => {
    const applications = [
        { title: 'Project Manager', company: 'TCS', dateApplied: 'Feb. 21, 2023, 6:26 p.m.' },
        { title: 'Project Manager', company: 'TCS', dateApplied: 'Feb. 21, 2023, 6:26 p.m.' },
        { title: 'Project Manager', company: 'TCS', dateApplied: 'Feb. 21, 2023, 6:26 p.m.' },
        { title: 'Project Manager', company: 'TCS', dateApplied: 'Oct. 3, 2024, 6:59 a.m.' },
    ];

    return (
        <div className="bg-gray-100 flex w-full p-16">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-2xl font-bold text-center mb-6">My Applications</h1>
                <br />
                <br />
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-blue-400 text-white uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Job Title</th>
                                <th className="py-3 px-6 text-left">Company</th>
                                <th className="py-3 px-6 text-left">Date Applied</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-light">
                            {applications.map((app, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 font-semibold text-sm">{app.title}</td>
                                    <td className="py-3 px-6 font-semibold text-sm">{app.company}</td>
                                    <td className="py-3 px-6 font-semibold text-sm">{app.dateApplied}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyApplications;
