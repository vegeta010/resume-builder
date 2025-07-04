import axios from 'axios';

export const uploadResume = async ({ profile, file, aboutMe, experience, education, skills }) => {
    const formData = new FormData();

    formData.append('candidate_name', profile.name || '');
    formData.append('city', profile.location || '');
    formData.append('designation', profile.position || '');
    formData.append('email', profile.email || '');
    formData.append('phone', profile.contact || '');
    formData.append('github_url', profile.github || '');
    formData.append('linkedin_url', profile.linkedin || '');
    formData.append('portfolio_url', profile.website || '');
    formData.append('about_self', aboutMe || '');
    formData.append('photo', file || '');

    const mappedExperience = experience.map(item => ({
        company: item.company,
        years: item.isWorking
            ? `${item.startMonth} ${item.startYear} - Present`
            : `${item.startMonth} ${item.startYear} - ${item.endMonth} ${item.endYear}`
    }));
    formData.append('experience', JSON.stringify(mappedExperience));

    const mappedEducation = education.map(item => ({
        institute: item.institute,
        degree: `${item.degree} in ${item.fieldOfStudy}`
    }));
    formData.append('education', JSON.stringify(mappedEducation));

    formData.append('skills', JSON.stringify(skills));

    try {
        const response = await axios.post('https://cv.ablyworks.com/api/cv', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error };
    }
};
