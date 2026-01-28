import React from "react";
import Title from "../Components/Title";

const policies = {
  terms: {
    title: "Terms and Conditions",
    content: `
1. **Services Offered**  
Technovahub provides technology education and software solutions including Robotics, AI, ML, Web & Game Development, Animation, Drone Technology, Cybersecurity, Blockchain, Agentic/Generative AI, AR/VR, certified training programs, workshops, and IT/automation solutions.

2. **Registration and Use**  
All information during registration must be accurate. Course materials are for personal learning only and may not be copied, shared, or resold without permission.

3. **Payments and Refunds**  
Full payment is required. Refunds only if explicitly stated. Scholarship eligibility requires official documentation.

4. **Intellectual Property**  
All content is property of Technovahub. Unauthorized reproduction or distribution is prohibited. Solutions delivered to businesses are the company's IP.

5. **Liability Disclaimer**  
Technovahub is not responsible for any loss, damage, or injury from participation or use of solutions.

6. **Third-Party Links**  
We are not responsible for external website content or privacy practices.

7. **Changes to Terms**  
We may revise these terms anytime; updates will be posted on the website.
    `,
  },
  privacy: {
    title: "Privacy Policy",
    content: `
1. **Information We Collect**  
- Personal Details: Name, email, phone, address.  
- Usage Data: How you use our services.  
- Payment Details: Processed securely via trusted gateways.

2. **How We Use Your Data**  
To register/manage account, deliver services, send updates/certificates, improve offerings.

3. **Sharing of Information**  
Not sold or rented. Shared only with service providers or legal authorities if required.

4. **Cookies**  
Enhance browsing experience. Disabling may limit functionality.

5. **Security**  
Industry-standard measures applied; no method is fully secure.

6. **Your Rights**  
Request access, correction, or deletion anytime.

7. **Changes to Policy**  
Updates posted on the website.
    `,
  },
};

const Card = ({ title, content }) => {
  return (
    <div className="bg-white  shadow-lg rounded-lg p-6 m-4 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">{title}</h2>
      <div className="text-gray-700 whitespace-pre-line">{content}</div>
    </div>
  );
};

export default function TermsAndCondition() {
  return (
    <div className="min-h-screen bg-gray-100 mt-[100px] md:p-6">
      <div className="text-center mb-6 mt-4">
        <Title text="Technovahub Policies"/>
       
      </div>
      <div className="max-w-10xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title={policies.terms.title} content={policies.terms.content} />
          <Card title={policies.privacy.title} content={policies.privacy.content} />
        </div>
        <div className="p-5 bg-blue-200 flex flex-col justify-center items-center  ">
            <span>Contact Us:
           Mail: technovahubcareer@gmail.com </span>
<br />
                 <span>
                  Call: +91 9360962810
                  </span>  
                  <br />

               <span> Location: 48, Lawspet Main Road, Puducherry, India</span>
        </div>
      </div>
    </div>
  );
}
