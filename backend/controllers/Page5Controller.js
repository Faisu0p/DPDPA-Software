import PreliminaryQuestions from '../models/preliminaryQModel.js';


// Function to generate observations and recommendations based on the answers to Yes/No questions
const generateObservationsAndRecommendations = (answers) => {
    const observations = [];
    const recommendations = {
      immediate: [],
      mediumTerm: [],
      longTerm: [],
    };
  
    // Handling each 'Yes/No' field in the schema
  
    // processPersonalData
    if (answers.processPersonalData === 'No') {
      observations.push(
        "Your organization is not processing personal data, which may limit your ability to offer certain services or comply with specific regulatory requirements."
      );
      recommendations.immediate.push(
        "Ensure that personal data processing activities are well-defined and comply with privacy regulations if processing is to be introduced."
      );
    } else if (answers.processPersonalData === 'Yes') {
      observations.push(
        "Your organization processes personal data, which is a significant responsibility under data protection laws like GDPR and DPDP Act 2023."
      );
      recommendations.immediate.push(
        "Ensure all personal data processing is in compliance with data protection laws and establish robust data governance policies."
      );
    }
  
    // internalAudits
    if (answers.internalAudits === 'No') {
      observations.push(
        "Your organization lacks internal audits to identify potential risks in data security, increasing the likelihood of undetected issues."
      );
      recommendations.immediate.push(
        "Establish a regular internal audit process to evaluate data security practices and compliance with applicable standards."
      );
      recommendations.mediumTerm.push(
        "Invest in audit tools or a dedicated audit team to streamline audit processes."
      );
    } else if (answers.internalAudits === 'Yes') {
      observations.push(
        "Your organization conducts internal audits, which help ensure compliance with internal policies and data security standards."
      );
      recommendations.immediate.push(
        "Maintain the effectiveness of internal audits by ensuring they cover all relevant areas, including data security and compliance."
      );
      recommendations.mediumTerm.push(
        "Consider increasing the frequency of audits to adapt to evolving regulatory standards."
      );
    }
  
    // dpiA (Data Protection Impact Assessment)
    if (answers.dpiA === 'No') {
      observations.push(
        "Your organization does not conduct DPIAs, which are essential to assess and mitigate risks related to data privacy and security."
      );
      recommendations.immediate.push(
        "Conduct DPIAs for all data processing activities involving personal data, especially those that could impact data privacy."
      );
      recommendations.mediumTerm.push(
        "Implement a policy to perform DPIAs regularly for all relevant processing activities."
      );
      recommendations.longTerm.push(
        "Review and update DPIAs periodically, especially when new data processing activities are introduced or the regulatory environment changes."
      );
    } else if (answers.dpiA === 'Yes') {
      observations.push(
        "Your organization conducts DPIAs, demonstrating a proactive approach to identifying and mitigating risks to personal data."
      );
      recommendations.immediate.push(
        "Ensure that DPIAs are comprehensive and regularly updated to reflect changes in data processing activities."
      );
      recommendations.mediumTerm.push(
        "Develop and enforce a process for DPIA reviews to maintain ongoing compliance."
      );
      recommendations.longTerm.push(
        "Ensure DPIA results are integrated into the broader risk management framework of the organization."
      );
    }
  
    // isoStatus (ISO 27001 compliance)
    if (answers.isoStatus === 'No') {
      observations.push(
        "Your organization is not ISO 27001 certified, potentially leaving gaps in information security management."
      );
      recommendations.immediate.push(
        "Start the process of becoming ISO 27001 certified by conducting a gap analysis and improving your information security controls."
      );
      recommendations.mediumTerm.push(
        "Invest in training and awareness programs for your team on ISO 27001 standards."
      );
    } else if (answers.isoStatus === 'Yes') {
      observations.push(
        "Your organization is ISO 27001 compliant, which demonstrates a commitment to information security management."
      );
      recommendations.immediate.push(
        "Maintain your ISO 27001 certification by ensuring continuous adherence to the security standards."
      );
      recommendations.mediumTerm.push(
        "Review your compliance practices annually to adapt to any changes in the ISO 27001 standards."
      );
      recommendations.longTerm.push(
        "Ensure that information security becomes a fundamental aspect of your organization's culture and governance."
      );
    }
  
    return { observations, recommendations };
  };
  
  
  

// Controller to fetch Yes/No questions from the PreliminaryQuestions collection and generate observations/recommendations
export const getYesNoQuestions = async (req, res) => {
  try {
    // Fetch only the Yes/No fields from the database
    const questions = await PreliminaryQuestions.find({}, 'processPersonalData internalAudits dpiA isoStatus');

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found.' });
    }

    // Generate dynamic observations and recommendations based on the answers
    const answers = questions[0];  // Assuming only one document exists; modify for specific reportId or other criteria
    const { observations, recommendations } = generateObservationsAndRecommendations(answers);

    // Return the questions, observations, and recommendations as a response
    return res.status(200).json({
      questions,
      observations,
      recommendations,
    });
  } catch (error) {
    console.error('Error fetching Yes/No questions:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};
