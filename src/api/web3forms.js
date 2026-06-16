/**
 * Submits the contact form data to the Web3Forms API.
 * @param {Object} formData The form input data { name, email, subject, message }
 * @returns {Promise<Object>} The API response JSON if successful
 * @throws {Error} If the access key is missing or the request fails
 */
export const submitContactForm = async (formData) => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  
  if (!accessKey) {
    throw new Error('Web3Forms access key is missing. Please add VITE_WEB3FORMS_ACCESS_KEY to your .env file.');
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      from_name: 'Portfolio Contact Form',
    }),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Failed to send message. Please try again.');
  }

  return result;
};
