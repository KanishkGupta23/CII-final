import React from 'react';

const StudentProfileView = ({ student, instituteData }) => {
  // If student data is not yet available, render a loading state or fallback
  if (!student) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl w-1/2 mx-auto m-10">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Student Profile</h2>
      </div>

      <div className="space-y-8">
        {/* Profile Picture and Basic Info */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full border-2 border-gray-200 overflow-hidden">
            <img className="object-cover w-full h-full" src={student.profilePic || "https://via.placeholder.com/150"} alt="Profile Pic" />
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-800">{student.name || 'Name not provided'}</h3>
            <p className="text-gray-500">{student.email || 'Email not provided'}</p>
          </div>
        </div>

        {/* Headline */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Headline</h4>
          <p className="text-gray-600">{student.headline || 'No headline provided'}</p>
        </div>

        {/* Current Employment */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Current Employment</h4>
          <p className="text-gray-600">{student.currentEmployment || 'Not currently employed'}</p>
        </div>

        {/* Education & Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Institute</h4>
            <p className="text-gray-600">{(instituteData?.find(item => item._id === student.institute) || {}).name || 'Institute not provided'}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Educational Degree</h4>
            <p className="text-gray-600">{student.educationalDegree || 'Degree not provided'}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Skills</h4>
            {student.skills && student.skills.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {student.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No skills provided</p>
            )}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Past Experience (Years)</h4>
            <p className="text-gray-600">{student.pastExperience || 0} years</p>
          </div>
        </div>

        {/* Open for Jobs */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Open for Job Opportunities</h4>
          <p className="text-gray-600">{student.openForJobs ? 'Yes' : 'No'}</p>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">LinkedIn</h4>
            {student.linkedinLink ? (
              <a href={student.linkedinLink} className="text-blue-500 hover:text-blue-600 transition">
                {student.linkedinLink}
              </a>
            ) : (
              <p className="text-gray-600">No LinkedIn link provided</p>
            )}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">GitHub</h4>
            {student.githubLink ? (
              <a href={student.githubLink} className="text-blue-500 hover:text-blue-600 transition">
                {student.githubLink}
              </a>
            ) : (
              <p className="text-gray-600">No GitHub link provided</p>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Contact Number</h4>
            <p className="text-gray-600">{student.contactNumber || 'Contact number not provided'}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Job Category</h4>
            <p className="text-gray-600">{student.jobCategory || 'Job category not provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileView;
