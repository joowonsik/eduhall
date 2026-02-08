const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const { school_name, user_name, phone, message } = JSON.parse(event.body);

  try {
    await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: process.env.SERVICE_ID,
      template_id: process.env.TEMPLATE_ID,
      user_id: process.env.PUBLIC_KEY,
      accessToken: process.env.PRIVATE_KEY, // EmailJS 보안 설정의 핵심
      template_params: { school_name, user_name, phone, message }
    });
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};